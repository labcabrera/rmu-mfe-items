import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CategorySeparator, ItemWeapon, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';
import ItemWeaponModeTable from './ItemWeaponModeTable';

export default function ItemWeaponAttributes({ weapon }: { weapon: ItemWeapon }) {
  const { t } = useTranslation();

  return (
    <>
      <CategorySeparator text={t('weapon')} />
      <Grid container spacing={1}>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={t(weapon.skillId)}
            subtitle={t('skill')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={weapon.fumble || 0}
            subtitle={t('fumble')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
            applyColor={false}
          />
        </Grid>
      </Grid>
      <Grid size={12}>
        <CategorySeparator text={t('attack-modes')} />
      </Grid>
      <Grid size={12}>
        <Grid size={12}>
          <ItemWeaponModeTable modes={weapon.modes} />
        </Grid>
      </Grid>
    </>
  );
}
