/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import {
  AddButton,
  fetchItems,
  Item,
  Page,
  RefreshButton,
  RmuPagination,
  RmuTextCard,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import LayoutBase from '../../components/LayoutBase';
import { gridSizeCard, itemFilter } from '../../services/display';
import ItemListSearch from './ItemListSearch';

export default function ItemList() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [pageData, setPageData] = useState<Page<Item>>();
  const [rsql, setRsql] = useState<string>('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const breadcrumbs = [
    { name: t('home'), link: '/' },
    { name: t('items'), link: '/items' },
  ];

  const onCardClick = (item: Item) => {
    navigate(`/items/view/${item.id}`, { state: { item } });
  };

  const bindItems = () => {
    fetchItems(rsql, page, pageSize, auth)
      .then((response) => setPageData(response))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    bindItems();
  }, [rsql, page, pageSize]);

  return (
    <>
      <LayoutBase
        breadcrumbs={breadcrumbs}
        actions={[
          <RefreshButton onClick={() => bindItems()} />,
          <AddButton onClick={() => navigate('/items/create')} />,
        ]}
      >
        <ItemListSearch onChange={(e) => setRsql(e)} />
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <>
            {!pageData && <p>Loading...</p>}
            {pageData &&
              pageData.content.map((item, index) => (
                <Grid size={gridSizeCard} key={index}>
                  <RmuTextCard
                    value={t(item.name)}
                    subtitle={t(item.category)}
                    image={item.imageUrl}
                    onClick={() => onCardClick(item)}
                    imageFilter={itemFilter}
                  />
                </Grid>
              ))}
            {pageData && pageData.content.length < 1 && <Typography>{t('no-results')}</Typography>}
          </>
        </Grid>
        <RmuPagination page={page} pageSize={pageSize} totalPages={page} setPage={setPage} setPageSize={setPageSize} />
      </LayoutBase>
    </>
  );
}
