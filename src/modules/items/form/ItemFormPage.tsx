/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  canEditEntity,
  createItem,
  CreateItemDto,
  EntityImage,
  EntitySourceField,
  EntityType,
  fetchItem,
  itemCategoryImage,
  itemImageFolder,
  FormPage,
  isAdmin,
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
  // Spec 063: set only by an admin through the source field; otherwise not sent.
  const [entitySource, setEntitySource] = useState<EntityType>();
  const editable = mode === 'create' || canEditEntity(existing.entity, auth);
  // Spec 073: an item without realm is global, and only an admin creates one
  const realmMissing = mode === 'create' && !formData?.realmId && !isAdmin(auth);

  useEffect(() => {
    const data = mode === 'create' ? EMPTY_ITEM : existing.entity;
    if (data && !formData) {
      setFormData(data);
      setInitialData(JSON.stringify(data));
    }
  }, [existing.entity]);

  const onSave = () => {
    if (!formData) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { id, owner, entitySource: current, ...rest } = formData;
    const source = entitySource ? { entitySource } : {};
    if (mode === 'create') {
      createItem({ id, ...rest, ...source } as unknown as CreateItemDto, auth)
        .then((item) => navigate(`/items/view/${item.id}`, { state: { item } }))
        .catch(notify.error);
      return;
    }
    updateItem(itemId!, { ...rest, ...source } as unknown as UpdateItemDto, auth)
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
      saveDisabled={!formData?.name || !editable || realmMissing}
      dirty={!!formData && (JSON.stringify(formData) !== initialData || !!entitySource)}
      leftPanel={
        formData && (
          <EntityImage
            kind="item"
            image={formData.imageUrl}
            fallbackImages={[itemCategoryImage(formData.category)]}
            imageCategory={itemImageFolder(formData.category)}
            onImageChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
          />
        )
      }
    >
      {formData ? (
        <>
          <ItemForm formData={formData} setFormData={setFormData} editable={editable} />
          <Box sx={{ mt: 2 }}>
            <EntitySourceField value={entitySource ?? formData.entitySource} onChange={setEntitySource} />
          </Box>
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
