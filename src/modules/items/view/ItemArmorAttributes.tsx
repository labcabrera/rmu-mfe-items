import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CategorySeparator, ItemArmor, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';

const grayscale = 0.7;

export default function ItemArmorAttributes({ armor }: { armor: ItemArmor }) {
  const { t } = useTranslation();

  return (
    <>
      <CategorySeparator text={t('armor')} />
      <Grid container spacing={1}>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={t(armor.slot)}
            subtitle={t('slot')}
            image={`${imageBaseUrl}images/generic/armor-skill.png`}
            grayscale={grayscale}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={armor.at || 0}
            subtitle={t('at')}
            image={`${imageBaseUrl}images/generic/armor.png`}
            applyColor={false}
            grayscale={grayscale}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={armor.enc || 0}
            subtitle={t('encumbrance')}
            image={`${imageBaseUrl}images/generic/weight-penalty.png`}
            applyColor={false}
            grayscale={grayscale}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={armor.maneuver || 0}
            subtitle={t('maneuver-penalty')}
            image={`${imageBaseUrl}images/generic/maneuver-penalty.png`}
            grayscale={grayscale}
            applyColor
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={armor.rangedPenalty || 0}
            subtitle={t('ranged-penalty')}
            image={`${imageBaseUrl}images/generic/armor-ranged-penalty.png`}
            grayscale={grayscale}
            applyColor
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={armor.perception || 0}
            subtitle={t('perception-penalty')}
            image={`${imageBaseUrl}images/generic/armor-perception-penalty.png`}
            grayscale={grayscale}
            applyColor
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={armor.baseDifficulty || ''}
            subtitle={t('base-difficulty')}
            image={`${imageBaseUrl}images/generic/maneuver-penalty.png`}
            grayscale={grayscale}
          />
        </Grid>
      </Grid>
    </>
  );
}
