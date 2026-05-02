import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { Item } from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemArmorAttributes from './ItemArmorAttributes';
import ItemInfoAttributes from './ItemInfoAttributes';
import ItemWeaponAttributes from './ItemWeaponAttributes';

export default function ItemViewContent({ item }: { item: Item }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Grid container spacing={1}>
        {item.weapon && (
          <Grid size={isMobile ? 12 : 6}>
            <ItemWeaponAttributes weapon={item.weapon} />
          </Grid>
        )}
        {item.armor && (
          <Grid size={isMobile ? 12 : 6}>
            <ItemArmorAttributes armor={item.armor} />
          </Grid>
        )}
        <Grid size={isMobile ? 12 : 6}>
          <ItemInfoAttributes item={item} />
        </Grid>
      </Grid>
    </>
  );
}
