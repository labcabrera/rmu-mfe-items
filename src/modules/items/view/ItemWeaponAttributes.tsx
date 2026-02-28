import React, { FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { WeaponInfo } from '../../api/item.dto';
import { imageBaseUrl } from '../../services/config';
import NumericCard from '../../shared/cards/NumericCard';
import TextCard from '../../shared/cards/TextCard';
import ItemWeaponMode from './ItemWeaponMode';

const ItemWeaponAttributes: FC<{
  weapon: WeaponInfo;
}> = ({ weapon }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <TextCard
              value={t(weapon.skillId)}
              subtitle={t('skill')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              maxWidth={500}
              minWidth={500}
            />
            <NumericCard
              value={weapon.fumble || 0}
              subtitle={t('fumble')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              applyColor={false}
            />
          </Stack>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            Attack modes
          </Typography>
        </Grid>
        <Grid size={12}>
          <Grid size={12}>
            {weapon.modes.map((mode, index) => (
              <ItemWeaponMode key={index} mode={mode} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemWeaponAttributes;
