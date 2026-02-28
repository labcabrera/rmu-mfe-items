import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Item } from '../../api/item.dto';
import ItemWeaponAttributes from './ItemWeaponAttributes';

const ItemViewAttributes: FC<{
  item: Item;
}> = ({ item }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>TODO item attributes</Grid>
        {item.weapon && (
          <Grid size={12}>
            <Typography variant="h6" gutterBottom>
              Weapon Attributes
            </Typography>
            <ItemWeaponAttributes weapon={item.weapon} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ItemViewAttributes;
