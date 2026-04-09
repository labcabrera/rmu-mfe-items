import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { CategorySeparator, ItemShield, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';

const ItemShieldAttributes: FC<{
  itemShield: ItemShield;
}> = ({ itemShield }) => {
  return (
    <>
      <CategorySeparator text={t('Shield')} />
      <Grid container spacing={1}>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={itemShield.db || '-'}
            subtitle={t('Defensive bonus')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
            applyColor={false}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={itemShield.blockCount || '-'}
            subtitle={t('Block count')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
            applyColor={false}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={4}
            subtitle={t('Fumble')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
            applyColor={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ItemShieldAttributes;
