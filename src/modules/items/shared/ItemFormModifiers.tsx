import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AddButton, DeleteButton, Item, ItemModifier, WeaponMode } from '@labcabrera-rmu/rmu-react-shared-lib';
import AddItemModifierDialog from './AddItemModifierDialog';

export default function ItemFormModifiers({
  formData,
  setFormData,
}: {
  formData: Item;
  setFormData: Dispatch<SetStateAction<Item>>;
}) {
  const { t } = useTranslation();
  const [modifierDialogOpen, setModifierDialogOpen] = useState<boolean>(false);

  const onModifierAdded = (modifier: ItemModifier) => {
    setFormData({ ...formData, modifiers: [...(formData.modifiers || []), modifier] });
  };

  const onDelete = (index: number) => {};

  return (
    <>
      <Grid>
        <Grid>{t('modifiers')}</Grid>
        <Grid>
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
                  <Row key={index} modifier={e} index={index} onDelete={onDelete} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <AddItemModifierDialog
        open={modifierDialogOpen}
        onAdd={(e) => {
          onModifierAdded(e);
          setModifierDialogOpen(false);
        }}
        onClose={() => setModifierDialogOpen(false)}
      />
    </>
  );
}

function Row({
  modifier,
  index,
  onDelete,
}: {
  modifier: ItemModifier;
  index: number;
  onDelete: (index: number) => void;
}) {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell>{t(modifier.type)}</TableCell>
      <TableCell>{modifier.value}</TableCell>
      <TableCell>{modifier.modifier}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">
        <DeleteButton onClick={() => onDelete(index)} />
      </TableCell>
    </TableRow>
  );
}
