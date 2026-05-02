/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  DeleteButton,
  DeleteDialog,
  deleteItem,
  EditableAvatar,
  EditButton,
  fetchItem,
  Item,
  RefreshButton,
  TechnicalInfo,
  updateItem,
  UpdateItemDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import LayoutBase from '../../components/LayoutBase';
import { getItemImages } from '../../services/image-service';
import ItemViewContent from './ItemViewContent';
import ItemViewResume from './ItemViewResume';

export default function ItemView() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { showError } = useError();
  const { itemId } = useParams<{ itemId?: string }>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [item, setItem] = useState<Item>();
  const breadcrumbs = [{ name: t('home'), link: '/' }, { name: t('items'), link: '/items' }, { name: t('view') }];

  const updateItemImage = (imageUrl: string) => {
    const dto = { imageUrl } as UpdateItemDto;
    updateItem(item!.id, dto, auth)
      .then((response) => setItem(response))
      .catch((err) => showError(err.message));
  };

  const onDelete = () => {
    deleteItem(item!.id, auth)
      .then(() => navigate('/items', { replace: true }))
      .catch((err) => showError(err.message));
  };

  const bindItem = (itemId: string) => {
    fetchItem(itemId, auth)
      .then((response) => setItem(response))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (location.state && location.state.item) {
      setItem(location.state.item);
    } else if (itemId) {
      bindItem(itemId);
    }
  }, [location.state, itemId]);

  if (!item) return <p>{t('no-results')}</p>;

  return (
    <>
      <LayoutBase
        breadcrumbs={breadcrumbs}
        actions={[
          <RefreshButton onClick={() => bindItem(item.id)} />,
          <EditButton onClick={() => navigate(`/items/edit/${item!.id}`, { state: { item } })} />,
          <DeleteButton onClick={() => setDeleteDialogOpen(true)} />,
        ]}
        leftPanel={
          <>
            <EditableAvatar
              imageUrl={item.imageUrl}
              variant="rounded"
              images={getItemImages()}
              onImageChange={(e) => updateItemImage(e)}
            />
            <ItemViewResume item={item} />
          </>
        }
      >
        <ItemViewContent item={item} />
        <TechnicalInfo>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </TechnicalInfo>
      </LayoutBase>
      <DeleteDialog
        open={deleteDialogOpen}
        message={`Are you sure you want to delete ${item.id} item? This action cannot be undone.`}
        onDelete={() => onDelete()}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
}
