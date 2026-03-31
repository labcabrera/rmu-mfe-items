import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Pagination } from '@mui/material';
import { RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchPagedItems } from '../../api/item';
import { Item } from '../../api/item.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard, gridSizeMain, gridSizeResume, itemFilter } from '../../services/display';
import ItemListActions from './ItemListActions';
import ItemListSearch from './ItemListSearch';

const PAGE_SIZE = 24;

const ItemList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [items, setItems] = useState<Item[]>([]);
  const [searchId, setSearchId] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const onCardClick = (item: Item) => {
    navigate(`/items/view/${item.id}`, { state: { item } });
  };

  const bindItems = (id: string, category: string, pageNumber: number = 0) => {
    let query = '';
    if (id) query += `id=re=${id}`;
    if (category) {
      if (query) query += ';';
      query += `category==${category}`;
    }

    fetchPagedItems(query, pageNumber, PAGE_SIZE)
      .then((response) => {
        setItems(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err: Error) => showError(err.message));
  };

  const handleSearch = (id: string, category: string) => {
    setSearchId(id);
    setSearchCategory(category);
    setPage(0);
    bindItems(id, category, 0);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    bindItems(searchId, searchCategory, value - 1);
  };

  useEffect(() => {
    bindItems('', '', 0);
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <ItemListActions setItems={setItems} />
          <ItemListSearch onSearch={handleSearch} />
          <Grid container spacing={1}>
            {items.map((item, index) => (
              <Grid size={gridSizeCard} key={index}>
                <RmuTextCard
                  value={t(item.id)}
                  subtitle={t(item.category)}
                  image={`${imageBaseUrl}images/items/${item.id}.png`}
                  onClick={() => onCardClick(item)}
                  imageFilter={itemFilter}
                />
              </Grid>
            ))}
            {items.length === 0 ? <p>No items found.</p> : null}
          </Grid>
          <Box mt={1} display="flex" justifyContent="center">
            <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemList;
