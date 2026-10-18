import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  fetchItems,
  Item,
  itemFilter,
  ListPage,
  RmuTextCard,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemListFilters from './ItemListFilters';

export default function ItemListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [rsql, setRsql] = useState('');
  const query = usePagedQuery<Item>({
    fetcher: (q, page, size) => fetchItems(q, page, size, auth),
    rsql,
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('items') }]}
      query={query}
      onAdd={() => navigate('/items/create')}
      filters={<ItemListFilters onChange={setRsql} />}
      renderItem={(item) => (
        <RmuTextCard
          value={t(item.name)}
          subtitle={t(item.category)}
          image={item.imageUrl}
          onClick={() => navigate(`/items/view/${item.id}`, { state: { item } })}
          imageFilter={itemFilter}
        />
      )}
    />
  );
}
