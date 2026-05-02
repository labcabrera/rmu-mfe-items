import React from 'react';
import { Grid } from '@mui/material';
import { Item } from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemInfoAttributes from './ItemInfoAttributes';
import ItemWeaponAttributes from './ItemWeaponAttributes';

export default function ItemViewContent({ item }: { item: Item }) {
  return (
    <>
      <Grid container spacing={1}>
        <Grid size={8}>
          <ItemWeaponAttributes weapon={item.weapon} />
        </Grid>
        <Grid size={4}>
          <ItemInfoAttributes item={item} />
        </Grid>
      </Grid>
    </>
  );
}
