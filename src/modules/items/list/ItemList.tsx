import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Pagination } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchPagedItems } from '../../api/item';
import { Item } from '../../api/item.dto';
import ItemCard from '../../shared/cards/ItemCard';
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
    if (category) query += `category==${category}`;

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
      <ItemListActions setItems={setItems} />
      <ItemListSearch onSearch={handleSearch} />
      <Grid container spacing={2} mb={2} alignItems="center">
        <Grid size={12}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            {items.map((item) => (
              <ItemCard key={item.id} onClick={() => onCardClick(item)} item={item} />
            ))}
          </Box>
          {items.length === 0 ? <p>No items found.</p> : null}
        </Grid>
      </Grid>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
      </Box>
    </>
  );
};

export default ItemList;
