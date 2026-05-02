import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import { ItemShield, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';
import Section from '../../components/Section';

export default function ItemShieldPanel({ shield }: { shield: ItemShield }) {
  const { t } = useTranslation();

  return (
    <Section title={t('shield')}>
      <Stack direction={'column'} spacing={1}>
        <StatRow label={t('at')} value={shield.db} />
        <StatRow label={t('block-count')} value={shield.blockCount} />
      </Stack>
    </Section>
  );
}
