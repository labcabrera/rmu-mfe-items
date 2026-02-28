import React, { FC } from 'react';
import { Box } from '@mui/material';
import { t } from 'i18next';
import { WeaponMode } from '../../api/item.dto';
import { imageBaseUrl } from '../../services/config';
import NumericCard from '../../shared/cards/NumericCard';
import TextCard from '../../shared/cards/TextCard';

const ItemWeaponMode: FC<{
  mode: WeaponMode;
}> = ({ mode }) => {
  return (
    <>
      <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
        <TextCard
          value={t(mode.type)}
          subtitle={t('attack-type')}
          image={`${imageBaseUrl}images/generic/configuration.png`}
        />
        <TextCard
          value={t(mode.attackTable)}
          subtitle={t('attack-table')}
          image={`${imageBaseUrl}images/generic/configuration.png`}
        />
        <TextCard
          value={t(mode.fumbleTable)}
          subtitle={t('fumble-table')}
          image={`${imageBaseUrl}images/generic/configuration.png`}
        />
        <NumericCard
          value={mode.sizeAdjustment || 0}
          subtitle={t('size-adjustment')}
          image={`${imageBaseUrl}images/generic/configuration.png`}
          applyColor={false}
        />
      </Box>
    </>
  );
};

export default ItemWeaponMode;
