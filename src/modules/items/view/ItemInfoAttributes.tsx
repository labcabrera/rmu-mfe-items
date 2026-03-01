import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { imageBaseUrl } from '../../services/config';
import NumericCard from '../../shared/cards/NumericCard';
import TextCard from '../../shared/cards/TextCard';

const ItemInfoAttributes: FC<{
  item: Item;
}> = ({ item }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            {t('information')}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            <NumericCard
              value={item.info.cost?.min || 0}
              subtitle={t('cost-min')}
              image={`${imageBaseUrl}images/generic/coins.png`}
              applyColor={false}
            />
            <NumericCard
              value={item.info.cost?.average || 0}
              subtitle={t('cost-average')}
              image={`${imageBaseUrl}images/generic/coins.png`}
              applyColor={false}
            />
            <NumericCard
              value={item.info.cost?.max || 0}
              subtitle={t('cost-max')}
              image={`${imageBaseUrl}images/generic/coins.png`}
              applyColor={false}
            />
            {item.info.weight && (
              <NumericCard
                value={item.info.weight || 0}
                subtitle={t('weight')}
                image={`${imageBaseUrl}images/generic/configuration.png`}
                applyColor={false}
              />
            )}
            {item.info.weightPercent && (
              <NumericCard
                value={item.info.weightPercent || 0}
                subtitle={t('weight-percent')}
                image={`${imageBaseUrl}images/generic/configuration.png`}
                applyColor={false}
              />
            )}
            <NumericCard
              value={item.info.strength || 0}
              subtitle={t('strength')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              applyColor={false}
            />
            <NumericCard
              value={item.info.productionHours || 0}
              subtitle={t('production-hours')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              applyColor={false}
            />
            <TextCard
              value={item.stackable ? t('yes') : t('no')}
              subtitle={t('stackable')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemInfoAttributes;
