import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchItems } from '../../api/item';
import { Item } from '../../api/item.dto';
import ItemCard from '../../shared/cards/ItemCard';
import ItemListActions from './ItemListActions';

const ItemList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [items, setItems] = useState<Item[]>([]);

  const onCardClick = (item: Item) => {
    navigate(`/items/view/${item.id}`, { state: { item } });
  };

  useEffect(() => {
    fetchItems('', 0, 20)
      .then((response) => setItems(response))
      .catch((err) => showError(err.message));
  }, [showError]);

  return (
    <>
      <ItemListActions setItems={setItems} />
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
    </>
  );
};

export default ItemList;
