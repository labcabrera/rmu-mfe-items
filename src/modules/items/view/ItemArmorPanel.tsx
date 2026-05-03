import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import { ItemArmor, Section, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemArmorPanel({ armor }: { armor: ItemArmor }) {
  const { t } = useTranslation();

  return (
    <Section title={t('armor')}>
      <Stack direction={'column'} spacing={1}>
        <StatRow label={t('at')} value={armor.at} />
        <StatRow label={t('slot')} value={t(armor.slot)} />
        <StatRow label={t('encumbrance')} value={armor.enc ? `${armor.enc}%` : '-'} />
        <StatRow label={t('maneuver-penalty')} value={armor.maneuverPenalty} danger={armor.maneuverPenalty < 0} />
        <StatRow label={t('perception-penalty')} value={armor.perceptionPenalty} danger={armor.perceptionPenalty < 0} />
        <StatRow label={t('ranged-penalty')} value={armor.rangedPenalty} danger={armor.rangedPenalty < 0} />
        <StatRow label={t('difficulty')} value={t(`difficulty-${armor.baseDifficulty}`)} />
      </Stack>
    </Section>
  );
}
