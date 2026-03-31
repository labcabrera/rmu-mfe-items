import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Item } from '../../api/item.dto';
import ItemArmorAttributes from './ItemArmorAttributes';
import ItemInfoAttributes from './ItemInfoAttributes';
import ItemShieldAttributes from './ItemShieldAttributes';
import ItemWeaponAttributes from './ItemWeaponAttributes';

const ItemViewAttributes: FC<{
  item: Item;
}> = ({ item }) => {
  return (
    <Grid container spacing={1}>
      {item.weapon && (
        <Grid size={12}>
          <ItemWeaponAttributes weapon={item.weapon} />
        </Grid>
      )}
      {item.armor && (
        <Grid size={12}>
          <ItemArmorAttributes armor={item.armor} />
        </Grid>
      )}
      {item.shield && (
        <Grid size={12}>
          <ItemShieldAttributes itemShield={item.shield} />
        </Grid>
      )}
      <Grid size={12}>
        <ItemInfoAttributes item={item} />
      </Grid>
    </Grid>
  );
};

export default ItemViewAttributes;
