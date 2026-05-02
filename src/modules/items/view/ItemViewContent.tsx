import React from 'react';
import { Grid } from '@mui/material';
import { Item } from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemArmorAttributes from './ItemArmorAttributes';
import ItemInfoAttributes from './ItemInfoAttributes';
import ItemWeaponAttributes from './ItemWeaponAttributes';

export default function ItemViewContent({ item }: { item: Item }) {
  return (
    <>
      <Grid container spacing={1}>
        {item.weapon && (
          <Grid size={8}>
            <ItemWeaponAttributes weapon={item.weapon} />
          </Grid>
        )}
        {item.armor && (
          <Grid size={8}>
            <ItemArmorAttributes armor={item.armor} />
          </Grid>
        )}
        <Grid size={4}>
          <ItemInfoAttributes item={item} />
        </Grid>
      </Grid>
    </>
  );
}
