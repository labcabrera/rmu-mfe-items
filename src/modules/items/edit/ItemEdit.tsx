/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CancelButton,
  EditableAvatar,
  fetchItem,
  Item,
  SaveButton,
  TechnicalInfo,
  updateItem,
  UpdateItemDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import LayoutBase from '../../components/LayoutBase';
import { imageBaseUrl } from '../../services/config';
import ItemForm from '../shared/ItemForm';

export default function ItemEdit() {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<Item>();
  const [formData, setFormData] = useState<Item>({} as Item);
  const breadcrumbs = [{ name: t('Items'), link: '/items' }, { name: t('Edit') }];

  const itemImageUrl = item?.imageUrl ? item.imageUrl : `${imageBaseUrl}images/items/${item?.id}.png`;

  const onImageChanged = (imageUrl: string) => {
    showError('Not implemented image update ' + imageUrl);
  };

  const onSave = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { id, ...rest } = formData;
    const dto = rest as unknown as UpdateItemDto;
    updateItem(item!.id, dto, auth)
      .then((data) => navigate(`/items/view/${item!.id}`, { state: { item: data } }))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  useEffect(() => {
    if (itemId) {
      fetchItem(itemId, auth)
        .then((response) => setItem(response))
        .catch((err) => showError(err.message));
    }
  }, [itemId]);

  if (!item || !formData) return <div>Loading item...</div>;

  return (
    <LayoutBase
      breadcrumbs={breadcrumbs}
      leftPanel={
        <>
          <EditableAvatar
            imageUrl={itemImageUrl}
            images={[]}
            onImageChange={(image) => onImageChanged(image)}
            variant="rounded"
          />
        </>
      }
      actions={[
        <CancelButton onClick={() => navigate(`/items/view/${item.id}`, { state: item })} />,
        <SaveButton onClick={onSave} />,
      ]}
    >
      <ItemForm formData={formData} setFormData={setFormData} />
      <TechnicalInfo>
        <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}
