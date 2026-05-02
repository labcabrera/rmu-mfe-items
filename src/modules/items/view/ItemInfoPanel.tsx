import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { Item, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemInfoPanel({ item }: { item: Item }) {
  const { t } = useTranslation();

  return (
    <>
      <Card elevation={0}>
        <CardContent>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 600 }}>
            {t('information')}
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <Stack direction={'column'} spacing={1}>
            <StatRow label={t('rarity')} value={t(item.info.rarity) || '-'} success={item.info.rarity !== 'common'} />
            <StatRow label={t('unique')} value={t(`${item.info.unique}`)} success={true} />
            <StatRow label={t('stackable')} value={t(`${item.info.stackable}`)} />
            <Divider />
            <StatRow label={t('weight')} value={item.info.weight ? `${item.info.length} lbs` : '-'} />
            <StatRow label={t('length')} value={item.info.length ? `${item.info.length}'` : '-'} />
            <StatRow label={t('strength')} value={item.info.strength || '-'} />
            <Divider />
            <StatRow label={t('cost-min')} value={item.info.cost?.min || '-'} />
            <StatRow label={t('cost-average')} value={item.info.cost?.average || '-'} />
            <StatRow label={t('cost-max')} value={item.info.cost?.max || '-'} />
            <StatRow label={t('production-hours')} value={item.info.productionHours || '-'} />
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
