/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  createItem,
  CreateItemDto,
  EntityImage,
  fetchItem,
  itemCategoryImage,
  FormPage,
  Item,
  LoadingState,
  TechnicalInfo,
  updateItem,
  UpdateItemDto,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemForm from './ItemForm';

const EMPTY_ITEM = {
  info: {
    rarity: 'common',
    stackable: false,
    unique: false,
  },
} as Item;

/** Create and edit page of an item. */
export default function ItemFormPage({ mode }: { mode: 'create' | 'edit' }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { itemId } = useParams<{ itemId?: string }>();
  const existing = useEntity<Item>(mode === 'edit' ? itemId : undefined, (id) => fetchItem(id, auth), {
    initial: location.state?.item,
    onError: notify.error,
  });
  const [formData, setFormData] = useState<Item>();
  const [initialData, setInitialData] = useState<string>();

  useEffect(() => {
    const data = mode === 'create' ? EMPTY_ITEM : existing.entity;
    if (data && !formData) {
      setFormData(data);
      setInitialData(JSON.stringify(data));
    }
  }, [existing.entity]);

  const onSave = () => {
    if (!formData) return;
    if (mode === 'create') {
      createItem(formData as unknown as CreateItemDto, auth)
        .then((item) => navigate(`/items/view/${item.id}`, { state: { item } }))
        .catch(notify.error);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { id, ...rest } = formData;
    updateItem(itemId!, rest as unknown as UpdateItemDto, auth)
      .then((item) => navigate(`/items/view/${item.id}`, { state: { item } }))
      .catch(notify.error);
  };

  const onCancel = () => navigate(mode === 'create' ? '/items' : `/items/view/${itemId}`);

  const breadcrumbs = [
    { name: t('home'), link: '/' },
    { name: t('items'), link: '/items' },
    { name: t(mode === 'create' ? 'creation' : 'edit') },
  ];

  return (
    <FormPage
      breadcrumbs={breadcrumbs}
      onSave={onSave}
      onCancel={onCancel}
      saveDisabled={!formData?.name}
      dirty={!!formData && JSON.stringify(formData) !== initialData}
      leftPanel={
        formData && (
          <EntityImage
            image={formData.imageUrl}
            fallbackImages={[itemCategoryImage(formData.category)]}
            onImageChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
          />
        )
      }
    >
      {formData ? (
        <>
          <ItemForm formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </>
      ) : (
        <LoadingState variant="detail" />
      )}
    </FormPage>
  );
}
