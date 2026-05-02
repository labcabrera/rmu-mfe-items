import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CategorySeparator, Item, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';

const grayscale = 0.7;

export default function ItemInfoAttributes({ item }: { item: Item }) {
  const { t } = useTranslation();

  return (
    <>
      <CategorySeparator text={t('Item information')} />
      <Grid container spacing={1}>
        {item.info.length && (
          <Grid size={gridSizeCard}>
            <RmuTextCard
              value={item.info.length || 0}
              subtitle={t('Length')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              applyColor={false}
              grayscale={grayscale}
            />
          </Grid>
        )}
        {item.info.weight && (
          <Grid size={gridSizeCard}>
            <RmuTextCard
              value={item.info.weight || 0}
              subtitle={t('Weight')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              applyColor={false}
              grayscale={grayscale}
            />
          </Grid>
        )}
        {item.info.weightPercent && (
          <Grid size={gridSizeCard}>
            <RmuTextCard
              value={item.info.weightPercent || 0}
              subtitle={t('weight-percent')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              applyColor={false}
              grayscale={grayscale}
            />
          </Grid>
        )}
        {item.info.strength && (
          <Grid size={gridSizeCard}>
            <RmuTextCard
              value={item.info.strength || 0}
              subtitle={t('strength')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              applyColor={false}
              grayscale={grayscale}
            />
          </Grid>
        )}
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={item.info.stackable ? t('yes') : t('no')}
            subtitle={t('stackable')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
            grayscale={grayscale}
          />
        </Grid>
      </Grid>
      <CategorySeparator text={t('Item information')} />
      <Grid container spacing={1}>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={item.info.cost?.min || 0}
            subtitle={t('cost-min')}
            image={`${imageBaseUrl}images/generic/coins.png`}
            applyColor={false}
            grayscale={grayscale}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={item.info.cost?.average || 0}
            subtitle={t('cost-average')}
            image={`${imageBaseUrl}images/generic/coins.png`}
            applyColor={false}
            grayscale={grayscale}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={item.info.cost?.max || 0}
            subtitle={t('cost-max')}
            image={`${imageBaseUrl}images/generic/coins.png`}
            applyColor={false}
            grayscale={grayscale}
          />
        </Grid>
        <Grid size={gridSizeCard}>
          <RmuTextCard
            value={item.info.productionHours || 0}
            subtitle={t('production-hours')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
            applyColor={false}
            grayscale={grayscale}
          />
        </Grid>
      </Grid>
    </>
  );
}
