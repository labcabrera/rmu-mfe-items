import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import {
  CancelButton,
  createItem,
  CreateItemDto,
  EditableAvatar,
  Item,
  SaveButton,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import LayoutBase from '../../components/LayoutBase';
import { imageBaseUrl } from '../../services/config';
import { getItemImages } from '../../services/image-service';
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
          images={getItemImages()}
          onImageChange={(e) => setFormData({ ...formData, imageUrl: e })}
        />
      }
    >
      <Paper sx={{ p: 2 }}>
        <ItemForm formData={formData} setFormData={setFormData} />
      </Paper>
      <TechnicalInfo>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}
