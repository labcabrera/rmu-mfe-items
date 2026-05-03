import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Stack } from '@mui/material';
import { ItemWeapon, Section, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemWeaponPanel({ weapon }: { weapon: ItemWeapon | null }) {
  const { t } = useTranslation();

  if (!weapon) return;

  const skillId = weapon.skillId.includes('@') ? weapon.skillId.split('@')[0] : weapon.skillId;
  const specialization = weapon.skillId.includes('@') ? weapon.skillId.split('@')[1] : weapon.skillId;

  return (
    <Section title={t('weapon')}>
      <Stack direction={'column'} spacing={1}>
        <StatRow label={t('skill')} value={t(skillId)} />
        <StatRow label={t('specialization')} value={t(specialization)} />
        <StatRow label={t('fumble')} value={weapon.fumble} />
        {weapon.modes.map((e, index) => (
          <Fragment key={index}>
            <Divider />
            <StatRow label={t('type')} value={t(e.type)} />
            <StatRow label={t('attack-types')} value={t(e.attackTypes)} />
            <StatRow label={t('attack-table')} value={t(e.attackTable)} />
            <StatRow label={t('fumble-table')} value={t(e.fumbleTable)} />
            <StatRow label={t('size-adjustment')} value={e.sizeAdjustment} />
            {e.ranges && (
              <>
                <Divider />
                <StatRow label={t('Ranges')} value="" />
                {e.ranges.map((r, i) => (
                  <StatRow
                    key={i}
                    label={`${r.from}' - ${r.to}'`}
                    value={r.bonus}
                    danger={r.bonus < 0}
                    success={r.bonus > 0}
                  />
                ))}
              </>
            )}
          </Fragment>
        ))}
      </Stack>
    </Section>
  );
}
