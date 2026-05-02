import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { ItemArmor, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemArmorAttributes({ armor }: { armor: ItemArmor }) {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 2 }}>
      <StatRow label={t('at')} value={armor.at} />
      <StatRow label={t('slot')} value={t(armor.slot)} />
      <StatRow label={t('encumbrance')} value={armor.enc ? `${armor.enc}%` : '-'} />
      <StatRow label={t('maneuver-penalty')} value={armor.maneuverPenalty} />
      <StatRow label={t('perception-penalty')} value={armor.perceptionPenalty} />
      <StatRow label={t('ranged-penalty')} value={armor.rangedPenalty} />
      <StatRow label={t('difficulty')} value={t(`difficulty-${armor.baseDifficulty}`)} />
    </Box>
  );
}
