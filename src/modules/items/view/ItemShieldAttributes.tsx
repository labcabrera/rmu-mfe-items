import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { ItemShield } from '../../api/item.dto';
import { imageBaseUrl } from '../../services/config';
import NumericCard from '../../shared/cards/NumericCard';

const ItemShieldAttributes: FC<{
  itemShield: ItemShield;
}> = ({ itemShield }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            {t('shield')}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            <NumericCard
              value={itemShield.attacks || 0}
              subtitle={t('block-attacks')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              applyColor={false}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemShieldAttributes;
