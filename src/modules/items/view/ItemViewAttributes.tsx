import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Item } from '../../api/item.dto';

const ItemViewAttributes: FC<{
  item: Item;
}> = ({ item }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>TODO item attributes</Grid>
      </Grid>
    </>
  );
};

export default ItemViewAttributes;
