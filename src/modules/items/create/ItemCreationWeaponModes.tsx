import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchAttackTables, fetchFumbleTables } from '../../api/attack-tables';
import { WeaponMode, WeaponModeType, WeaponAttackType } from '../../api/item.dto';
import SelectAttackTable from '../../shared/selects/SelectAttackTable';
import SelectFumbleTable from '../../shared/selects/SelectFumbleTable';

type LocalMode = WeaponMode & { id: string };

type Props = {
  modes?: WeaponMode[];
  onChange?: (modes: WeaponMode[]) => void;
};

export default function ItemCreationWeaponModes({ modes = [], onChange }: Props) {
  const { showError } = useError();
  const [attackTables, setAttackTables] = useState<string[]>([]);
  const [fumbleTables, setFumbleTables] = useState<string[]>([]);

  const [items, setItems] = useState<LocalMode[]>(modes.map((m) => ({ ...m, id: String(Math.random()).slice(2) })));

  const [open, setOpen] = useState(false);
  const [type, setType] = useState<WeaponModeType>('one-hand');
  const [attackTypes, setAttackTypes] = useState<string>('melee');
  const [attackTable, setAttackTable] = useState<string>('');
  const [fumbleTable, setFumbleTable] = useState<string>('');
  const [sizeAdjustment, setSizeAdjustment] = useState<number>(0);

  function handleAdd() {
    const mode: WeaponMode = {
      type,
      attackTypes: attackTypes
        .split(',')
        .map((s) => s.trim() as WeaponAttackType)
        .filter(Boolean),
      attackTable,
      fumbleTable,
      sizeAdjustment,
    };
    const local: LocalMode = { ...mode, id: String(Date.now()) };
    const next = [...items, local];
    setItems(next);
    onChange?.(next.map(({ id: _id, ...rest }) => rest));
    // reset
    setType('one-hand');
    setAttackTypes('melee');
    setAttackTable('');
    setFumbleTable('');
    setSizeAdjustment(0);
    setOpen(false);
  }

  function handleDelete(id: string) {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    onChange?.(next.map(({ id: _id, ...rest }) => rest));
  }

  useEffect(() => {
    fetchAttackTables()
      .then(setAttackTables)
      .catch((err: Error) => showError(err.message));
    fetchFumbleTables()
      .then(setFumbleTables)
      .catch((err: Error) => showError(err.message));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <h4 style={{ flex: 1, margin: 0 }}>Modos</h4>
        <IconButton aria-label="add" color="primary" onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Nombre</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Valor</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: 8 }}></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ padding: 8 }}>
                {t('at-least-one-mode-required')}
              </td>
            </tr>
          ) : (
            items.map((m) => (
              <tr key={m.id}>
                <td style={{ padding: 8 }}>{m.type}</td>
                <td style={{ padding: 8 }}>{m.attackTypes.join(', ')}</td>
                <td style={{ padding: 8 }}>{m.attackTable}</td>
                <td style={{ padding: 8 }}>{m.fumbleTable}</td>
                <td style={{ padding: 8 }}>
                  <IconButton size="small" onClick={() => handleDelete(m.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Añadir modo</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="mode-type-label">Tipo</InputLabel>
            <Select
              labelId="mode-type-label"
              value={type}
              label="Tipo"
              onChange={(e) => setType(e.target.value as WeaponModeType)}
            >
              <MenuItem value="one-hand">one-hand</MenuItem>
              <MenuItem value="two-hands">two-hands</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Attack types (comma separated)"
            type="text"
            fullWidth
            value={attackTypes}
            onChange={(e) => setAttackTypes(e.target.value)}
          />

          <SelectAttackTable
            label="Attack table"
            name="attackTable"
            tables={attackTables}
            value={attackTable}
            onChange={setAttackTable}
          />

          <SelectFumbleTable
            label="Fumble table"
            name="fumbleTable"
            tables={fumbleTables}
            value={fumbleTable}
            onChange={setFumbleTable}
          />

          <TextField
            margin="dense"
            label="Size adjustment"
            type="number"
            fullWidth
            value={String(sizeAdjustment)}
            onChange={(e) => setSizeAdjustment(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Añadir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
