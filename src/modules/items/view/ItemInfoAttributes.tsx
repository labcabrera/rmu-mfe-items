import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Divider } from '@mui/material';
import { Item, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemInfoAttributes({ item }: { item: Item }) {
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <StatRow label={t('rarity')} value={item.info.rarity || '-'} />
        <StatRow label={t('unique')} value={t(`${item.info.unique}`)} />
        <StatRow label={t('stackable')} value={t(`${item.info.stackable}`)} />
        <Divider />
        <StatRow label={t('weight')} value={item.info.weight || '-'} />
        <StatRow label={t('length')} value={item.info.length || '-'} />
        <StatRow label={t('strength')} value={item.info.strength || '-'} />
        <Divider />
        <StatRow label={t('cost-min')} value={item.info.cost?.min || '-'} />
        <StatRow label={t('cost-avg')} value={item.info.cost?.average || '-'} />
        <StatRow label={t('cost-max')} value={item.info.cost?.max || '-'} />
        <StatRow label={t('production-hours')} value={item.info.productionHours || '-'} />
      </Box>
    </>
  );
}
