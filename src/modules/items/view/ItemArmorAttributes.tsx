import React from 'react';
import { useTranslation } from 'react-i18next';
import { ItemArmor, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';
import Section from '../../components/Section';

export default function ItemArmorPanel({ armor }: { armor: ItemArmor }) {
  const { t } = useTranslation();

  return (
    <Section title={t('armor')}>
      <StatRow label={t('at')} value={armor.at} />
      <StatRow label={t('slot')} value={t(armor.slot)} />
      <StatRow label={t('encumbrance')} value={armor.enc ? `${armor.enc}%` : '-'} />
      <StatRow label={t('maneuver-penalty')} value={armor.maneuverPenalty} danger={armor.maneuverPenalty < 0} />
      <StatRow label={t('perception-penalty')} value={armor.perceptionPenalty} danger={armor.perceptionPenalty < 0} />
      <StatRow label={t('ranged-penalty')} value={armor.rangedPenalty} danger={armor.rangedPenalty < 0} />
      <StatRow label={t('difficulty')} value={t(`difficulty-${armor.baseDifficulty}`)} />
    </Section>
  );
}
