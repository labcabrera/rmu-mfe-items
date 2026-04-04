import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { CategorySeparator, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { ItemArmor } from '../../api/item.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';

const grayscale = 0.7;

const ItemArmorAttributes: FC<{
  armor: ItemArmor;
}> = ({ armor }) => {
  return (
    <>
      <CategorySeparator text={t('Armor')} />
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
};

export default ItemArmorAttributes;
