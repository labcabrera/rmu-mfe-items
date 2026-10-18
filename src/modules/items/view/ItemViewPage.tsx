import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteItem, DetailPage, fetchItem, Item, useEntity, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemViewContent from './ItemViewContent';
import ItemViewResume from './ItemViewResume';

export default function ItemViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { itemId } = useParams<{ itemId?: string }>();
  const state = useEntity<Item>(itemId, (id) => fetchItem(id, auth), {
    initial: location.state?.item,
    onError: notify.error,
  });

  const onDelete = (item: Item) =>
    deleteItem(item.id, auth)
      .then(() => navigate('/items', { replace: true }))
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('items'), link: '/items' }, { name: t('view') }]}
      entity={state}
      summaryTitle={(entity) => t(entity.name)}
      onEdit={(item) => navigate(`/items/edit/${item.id}`, { state: { item } })}
      onDelete={onDelete}
      leftPanel={(item) => <ItemViewResume item={item} setItem={state.setEntity} />}
    >
      {(item) => <ItemViewContent item={item} />}
    </DetailPage>
  );
}
