import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {
  AddButton,
  CategorySeparator,
  DeleteButton,
  Item,
  ItemModifier,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AddItemModifierDialog from './AddItemModifierDialog';

export default function ItemFormModifiers({
  formData,
  setFormData,
  editable = true,
}: {
  formData: Item;
  setFormData: (item: Item) => void;
  /** Spec 063: without permission on the item, its modifiers cannot be added or removed. */
  editable?: boolean;
}) {
  const { t } = useTranslation();
  const notify = useNotify();
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
              <TableCell align="left">{t('type')}</TableCell>
              <TableCell align="left">{t('bonus')}</TableCell>
              <TableCell align="left">{t('modifier')}</TableCell>
              <TableCell align="left">{t('spec')}</TableCell>
              <TableCell align="right">
                {editable && <AddButton onClick={() => setModifierDialogOpen(true)} />}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(formData.modifiers || []).map((e, index) => (
              <Row key={index} modifier={e} onDelete={editable ? onDelete : undefined} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddItemModifierDialog
        open={modifierDialogOpen}
        onAdd={(e) => onModifierAdded(e)}
        onClose={() => setModifierDialogOpen(false)}
        onError={(err) => notify.error(err)}
      />
    </>
  );
}

function Row({ modifier, onDelete }: { modifier: ItemModifier; onDelete?: (id: string) => void }) {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell>{t(modifier.type)}</TableCell>
      <TableCell>{modifier.value || '-'}</TableCell>
      <TableCell>{modifier.modifier ? t(modifier.modifier) : '-'}</TableCell>
      <TableCell>{modifier.specialization ? t(modifier.specialization) : '-'}</TableCell>
      <TableCell align="right">{onDelete && <DeleteButton onClick={() => onDelete(modifier.id)} />}</TableCell>
    </TableRow>
  );
}
