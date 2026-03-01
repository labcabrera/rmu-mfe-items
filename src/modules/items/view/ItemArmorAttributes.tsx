import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { ItemArmor } from '../../api/item.dto';
import { imageBaseUrl } from '../../services/config';
import NumericCard from '../../shared/cards/NumericCard';
import TextCard from '../../shared/cards/TextCard';

const ItemArmorAttributes: FC<{
  armor: ItemArmor;
}> = ({ armor }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            {t('armor')}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            <TextCard
              value={t(armor.slot)}
              subtitle={t('slot')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
            />
            <NumericCard
              value={armor.at || 0}
              subtitle={t('at')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              applyColor={false}
            />
            <NumericCard
              value={armor.enc || 0}
              subtitle={t('encumbrance')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              applyColor={false}
            />
            <NumericCard
              value={armor.maneuver || 0}
              subtitle={t('maneuver-penalty')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
            />
            <NumericCard
              value={armor.rangedPenalty || 0}
              subtitle={t('ranged-penalty')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
            />
            <NumericCard
              value={armor.perception || 0}
              subtitle={t('perception')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
            />
            <TextCard
              value={armor.baseDifficulty || ''}
              subtitle={t('base-difficulty')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemArmorAttributes;
