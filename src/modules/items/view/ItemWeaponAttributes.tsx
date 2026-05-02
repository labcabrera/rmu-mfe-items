import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { ItemWeapon, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemWeaponModeTable from './ItemWeaponModeTable';

export default function ItemWeaponAttributes({ weapon }: { weapon: ItemWeapon | null }) {
  const { t } = useTranslation();

  if (!weapon) return;

  const skillId = weapon.skillId.includes('@') ? weapon.skillId.split('@')[0] : weapon.skillId;
  const specialization = weapon.skillId.includes('@') ? weapon.skillId.split('@')[1] : weapon.skillId;

  return (
    <>
      <Box sx={{ p: 2 }}>
        <StatRow label={t('skill')} value={t(skillId)} />
        <StatRow label={t('specialization')} value={t(specialization)} />
        <StatRow label={t('fumble')} value={weapon.fumble} />
      </Box>
      <Box>
        <ItemWeaponModeTable modes={weapon.modes} />
      </Box>
    </>
  );
}
