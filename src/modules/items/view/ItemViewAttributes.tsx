import React from 'react';
import { Grid } from '@mui/material';
import { Item } from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemArmorAttributes from './ItemArmorAttributes';
import ItemInfoPanel from './ItemInfoPanel';
import ItemShieldAttributes from './ItemShieldAttributes';
import ItemWeaponAttributes from './ItemWeaponAttributes';

export default function ItemViewAttributes({ item }: { item: Item }) {
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
        <ItemInfoPanel item={item} />
      </Grid>
    </Grid>
  );
}
