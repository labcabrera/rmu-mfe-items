import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CategorySeparator, ItemShield, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';

export default function ItemShieldAttributes({ itemShield }: { itemShield: ItemShield }) {
  const { t } = useTranslation();

  return (
    <>
      <CategorySeparator text={t('shield')} />
      <Grid container spacing={1}>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={itemShield.db || '-'}
            subtitle={t('defensive-bonus')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
            applyColor={false}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={itemShield.blockCount || '-'}
            subtitle={t('block-count')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
            applyColor={false}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={4}
            subtitle={t('fumble')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
            applyColor={false}
          />
        </Grid>
      </Grid>
    </>
  );
}
