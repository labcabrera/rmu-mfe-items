/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import {
  fetchRealms,
  Item,
  ITEM_CATALOG_MAX,
  ItemCard,
  itemCatalogColumns,
  ItemCatalogFilterSections,
  itemCatalogFilters,
  ItemSortControl,
  ListPage,
  LoadingState,
  Realm,
  useItemCatalog,
  useItemCatalogQuery,
  useListFilters,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

/**
 * The item catalog (spec 046, decisions 11-13): loaded whole, filtered by translated name and type data, sorted and
 * paged on the client. The filters live in the URL, so they survive opening an item and coming back.
 */
export default function ItemListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const [realms, setRealms] = useState<Realm[]>();
  const filters = useListFilters(itemCatalogFilters(t, { realms, owner: auth.user?.profile.sub }));
  const { items, error, truncated, refresh } = useItemCatalog();
  const query = useItemCatalogQuery(items, filters, { error, refresh });

  useEffect(() => {
    fetchRealms('', 0, 100, auth)
      .then((response) => setRealms(response.content))
      .catch(notify.error);
  }, []);

  // The view goes back to the list with the same filters (breadcrumb and delete).
  const open = (item: Item) => navigate(`/items/view/${item.id}`, { state: { item, from: location.search } });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('items') }]}
      query={query}
      onAdd={() => navigate('/items/create')}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="items.list"
      filters={<ItemCatalogFilterSections filters={filters} realms={realms} />}
      resultsActions={<ItemSortControl filters={filters} />}
      loading={<LoadingState variant="showcase" />}
      collection={{
        modes: ['cards', 'table'],
        storageKey: 'items.list',
        columns: itemCatalogColumns(t),
        onSelect: open,
      }}
      renderItem={(item) => <ItemCard item={item} onClick={() => open(item)} />}
    >
      {truncated && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {t('item-catalog-limit', { max: ITEM_CATALOG_MAX })}
        </Alert>
      )}
    </ListPage>
  );
}
