import React, { useState, Dispatch, SetStateAction, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AddButton, DeleteButton, Item, WeaponMode } from '@labcabrera-rmu/rmu-react-shared-lib';
import AddAttackModeDialog from './AddAttackModeDialog';

const tableMinWidth = 900;

const ItemFormWeaponAttacks: FC<{
  formData: Item;
  setFormData: Dispatch<SetStateAction<Item>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const onModeAdded = (mode: WeaponMode) => {
    setFormData({ ...formData, weapon: { ...formData.weapon, modes: [...formData.weapon!.modes!, mode] } });
  };

  const onDeleted = (index: number) => {
    setFormData({
      ...formData,
      weapon: {
        ...formData.weapon,
        modes: formData.weapon!.modes!.filter((_, i) => i !== index),
      },
    });
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
              <Row key={index} mode={mode} index={index} onDelete={onDeleted} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddAttackModeDialog open={open} onClose={() => setOpen(false)} onModeAdded={(mode) => onModeAdded(mode)} />
    </>
  );
};

const Row: FC<{ mode: WeaponMode; index: number; onDelete: (index: number) => void }> = ({ mode, index, onDelete }) => {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell>{t(mode.type)}</TableCell>
      <TableCell>{mode.attackTypes.map((e) => t(e)).join(', ')}</TableCell>
      <TableCell>{t(mode.attackTable)}</TableCell>
      <TableCell>{t(mode.fumbleTable)}</TableCell>
      <TableCell align="right">{mode.sizeAdjustment}</TableCell>
      <TableCell align="right">
        <DeleteButton onClick={() => onDelete(index)} />
      </TableCell>
    </TableRow>
  );
};

export default ItemFormWeaponAttacks;
