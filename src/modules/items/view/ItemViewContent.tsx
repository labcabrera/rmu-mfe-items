import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { Item, ItemFeatureChips, itemFeatureLines, Section } from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemArmorPanel from './ItemArmorPanel';
import ItemInfoPanel from './ItemInfoPanel';
import ItemModifiersPanel from './ItemModifiersPanel';
import ItemShieldPanel from './ItemShieldPanel';
import ItemWeaponPanel from './ItemWeaponPanel';

export default function ItemViewContent({ item }: { item: Item }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  // Spec 041: what it holds, lights, carries or shoots; the lot and armor data have their own panels
  const features = { features: item.features, weapon: item.weapon };

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
        {itemFeatureLines(features, t).length > 0 && (
          <Grid size={isMobile ? 12 : 6}>
            <Section title={t('item-features')}>
              <ItemFeatureChips item={features} />
            </Section>
          </Grid>
        )}
        <Grid size={12}>
          <ItemModifiersPanel item={item} />
        </Grid>
      </Grid>
    </>
  );
}
