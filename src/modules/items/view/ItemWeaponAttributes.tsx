import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { CategorySeparator, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { ItemWeapon } from '../../api/item.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';
import ItemWeaponModeTable from './ItemWeaponModeTable';

const ItemWeaponAttributes: FC<{
  weapon: ItemWeapon;
}> = ({ weapon }) => {
  return (
    <>
      <CategorySeparator text={t('Weapon')} />
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
        <CategorySeparator text={t('Attack modes')} />
      </Grid>
      <Grid size={12}>
        <Grid size={12}>
          <ItemWeaponModeTable modes={weapon.modes} />
        </Grid>
      </Grid>
    </>
  );
};

export default ItemWeaponAttributes;
