import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  CancelButton,
  createItem,
  CreateItemDto,
  EditableAvatar,
  Item,
  LayoutBase,
  SaveButton,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import ItemForm from '../shared/ItemForm';

const EMPTY_ITEM = {
  info: {
    rarity: 'common',
    stackable: false,
    unique: false,
  },
  imageUrl: `${imageBaseUrl}images/generic/configuration.png`,
} as Item;

export default function ItemCreation() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [formData, setFormData] = useState<Item>(EMPTY_ITEM);
  const [isValid, setIsValid] = useState(false);
  const breadcrumbs = [
    { name: t('home'), link: '/items' },
    { name: t('items'), link: '/items' },
    { name: t('creation') },
  ];

  const validateForm = (formData: Item) => {
    if (!formData.name) return false;
    return true;
  };

  const onSaveClick = () => {
    const dto = formData as unknown as CreateItemDto;
    createItem(dto, auth)
      .then((item) => navigate(`/items/view/${item.id}`))
      .catch((err) => showError(err.message));
  };

  const onBackClick = () => {
    navigate(`/items`);
  };

  useEffect(() => {
    if (formData) {
      setIsValid(validateForm(formData));
    }
  }, [formData]);

  if (!formData) return <div>Loading...</div>;

  return (
    <LayoutBase
      breadcrumbs={breadcrumbs}
      actions={[<CancelButton onClick={onBackClick} />, <SaveButton onClick={onSaveClick} disabled={!isValid} />]}
      leftPanel={
        <EditableAvatar
          imageUrl={formData.imageUrl}
          variant="rounded"
          onImageChange={(e) => setFormData({ ...formData, imageUrl: e })}
        />
      }
    >
      <ItemForm formData={formData} setFormData={setFormData} />
      <TechnicalInfo>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}
