import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { CategorySeparator, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { ItemShield } from '../../api/item.dto';
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
            value={itemShield.attacks || 0}
            subtitle={t('block-attacks')}
            image={`${imageBaseUrl}images/generic/configuration.png`}
            applyColor={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ItemShieldAttributes;
