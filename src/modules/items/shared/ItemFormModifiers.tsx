import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AddButton, CategorySeparator, DeleteButton, Item, ItemModifier } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import AddItemModifierDialog from './AddItemModifierDialog';

export default function ItemFormModifiers({
  formData,
  setFormData,
}: {
  formData: Item;
  setFormData: Dispatch<SetStateAction<Item>>;
}) {
  const { t } = useTranslation();
  const { showError } = useError();
  const [modifierDialogOpen, setModifierDialogOpen] = useState<boolean>(false);

  const onModifierAdded = (modifier: ItemModifier) => {
    setFormData({ ...formData, modifiers: [...(formData.modifiers || []), modifier] });
  };

  const onDelete = (id: string) => {
    setFormData({ ...formData, modifiers: (formData.modifiers || []).filter((e) => e.id !== id) });
  };

  return (
    <>
      <CategorySeparator text={t('modifiers')} />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">{t('Type')}</TableCell>
              <TableCell align="left">{t('Bonus')}</TableCell>
              <TableCell align="left">{t('Modifier')}</TableCell>
              <TableCell align="left">{t('Spec')}</TableCell>
              <TableCell align="right">
                <AddButton onClick={() => setModifierDialogOpen(true)} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(formData.modifiers || []).map((e, index) => (
              <Row key={index} modifier={e} onDelete={onDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddItemModifierDialog
        open={modifierDialogOpen}
        onAdd={(e) => onModifierAdded(e)}
        onClose={() => setModifierDialogOpen(false)}
        onError={(err) => showError(err)}
      />
    </>
  );
}

function Row({ modifier, onDelete }: { modifier: ItemModifier; onDelete: (id: string) => void }) {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell>{t(modifier.type)}</TableCell>
      <TableCell>{modifier.value || '-'}</TableCell>
      <TableCell>{modifier.modifier ? t(modifier.modifier) : '-'}</TableCell>
      <TableCell>{modifier.specialization ? t(modifier.specialization) : '-'}</TableCell>
      <TableCell align="right">
        <DeleteButton onClick={() => onDelete(modifier.id)} />
      </TableCell>
    </TableRow>
  );
}
