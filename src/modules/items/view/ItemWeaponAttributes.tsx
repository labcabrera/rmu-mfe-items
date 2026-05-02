import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Paper } from '@mui/material';
import { ItemWeapon, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemWeaponAttributes({ weapon }: { weapon: ItemWeapon | null }) {
  const { t } = useTranslation();

  if (!weapon) return;

  const skillId = weapon.skillId.includes('@') ? weapon.skillId.split('@')[0] : weapon.skillId;
  const specialization = weapon.skillId.includes('@') ? weapon.skillId.split('@')[1] : weapon.skillId;

  return (
    <>
      <Paper elevation={0}>
        <Box sx={{ p: 2 }}>
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
            </Fragment>
          ))}
        </Box>
      </Paper>
      {/* <Paper>foo bar value</Paper>
      <Paper elevation={-4}>foo bar value -4</Paper>
      <Paper elevation={-3}>foo bar value -3</Paper>
      <Paper elevation={-2}>foo bar value -2</Paper>
      <Paper elevation={-1}>foo bar value -1</Paper>
      <Paper elevation={0}>foo bar value 0</Paper>
      <Paper elevation={0.5}>foo bar value 0.5</Paper>
      <Paper elevation={1}>foo bar value 1</Paper>
      <Paper elevation={2}>foo bar value 2</Paper>
      <Paper elevation={3}>foo bar value</Paper>
      <Paper elevation={4}>foo bar value</Paper>
      <Paper elevation={5}>foo bar value</Paper>
      <Paper elevation={6}>foo bar value</Paper>
      <Paper elevation={7}>foo bar value</Paper>
      <Paper elevation={8}>foo bar value</Paper>
      <Paper elevation={9}>foo bar value 9</Paper> */}
    </>
  );
}
