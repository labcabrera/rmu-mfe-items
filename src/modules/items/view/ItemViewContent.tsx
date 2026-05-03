import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { Item } from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemArmorPanel from './ItemArmorPanel';
import ItemInfoPanel from './ItemInfoPanel';
import ItemModifiersPanel from './ItemModifiersPanel';
import ItemShieldPanel from './ItemShieldPanel';
import ItemWeaponPanel from './ItemWeaponPanel';

export default function ItemViewContent({ item }: { item: Item }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Grid container spacing={1}>
        {item.weapon && (
          <Grid size={isMobile ? 12 : 6}>
            <ItemWeaponPanel weapon={item.weapon} />
          </Grid>
        )}
        {item.armor && (
          <Grid size={isMobile ? 12 : 6}>
            <ItemArmorPanel armor={item.armor} />
          </Grid>
        )}
        {item.shield && (
          <Grid size={isMobile ? 12 : 6}>
            <ItemShieldPanel shield={item.shield} />
          </Grid>
        )}
        <Grid size={isMobile ? 12 : 6}>
          <ItemInfoPanel item={item} />
        </Grid>
        <Grid size={12}>
          <ItemModifiersPanel item={item} />
        </Grid>
      </Grid>
    </>
  );
}
