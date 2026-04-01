import React, { useState, Dispatch, SetStateAction, FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AddButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { CreateItemDto, WeaponMode } from '../../api/item.dto';
import AddAttackModeDialog from './AddAttackModeDialog';

const tableMinWidth = 900;

const ItemFormWeaponAttacks: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  const [open, setOpen] = useState(false);

  const onModeAdded = (mode: WeaponMode) => {
    setFormData({ ...formData, weapon: { ...formData.weapon, modes: [...formData.weapon!.modes!, mode] } });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: tableMinWidth }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">{t('Type')}</TableCell>
              <TableCell align="left">{t('Types')}</TableCell>
              <TableCell align="left">{t('Attack table')}</TableCell>
              <TableCell align="left">{t('Fumble table')}</TableCell>
              <TableCell align="right">{t('Size adjustment')}</TableCell>
              <TableCell align="right">
                <AddButton onClick={() => setOpen(true)} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.weapon!.modes!.map((mode, index) => (
              <Row key={index} mode={mode} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddAttackModeDialog open={open} onClose={() => setOpen(false)} onModeAdded={(mode) => onModeAdded(mode)} />
    </>
  );
};

const Row: FC<{ mode: WeaponMode }> = ({ mode }) => {
  return (
    <TableRow>
      <TableCell>{t(mode.type)}</TableCell>
      <TableCell>{mode.attackTypes.map((e) => t(e)).join(', ')}</TableCell>
      <TableCell>{t(mode.attackTable)}</TableCell>
      <TableCell>{t(mode.fumbleTable)}</TableCell>
      <TableCell align="right">{mode.sizeAdjustment}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default ItemFormWeaponAttacks;
