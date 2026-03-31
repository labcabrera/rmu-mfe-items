import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Grid,
} from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchAttackTables, fetchFumbleTables } from '../../api/attack-tables';
import { WeaponMode, WeaponModeType, WeaponAttackType } from '../../api/item.dto';
import { CreateItemDto } from '../../api/item.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectAttackTable from '../../shared/selects/SelectAttackTable';
import SelectFumbleTable from '../../shared/selects/SelectFumbleTable';

type LocalMode = WeaponMode & { id: string };

type Props = {
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
};

export default function ItemCreationWeaponModes({ formData, setFormData }: Props) {
  const { showError } = useError();
  const [attackTables, setAttackTables] = useState<string[]>([]);
  const [fumbleTables, setFumbleTables] = useState<string[]>([]);

  const [items, setItems] = useState<LocalMode[]>(
    (formData.weapon?.modes || []).map((m) => ({ ...m, id: String(Math.random()).slice(2) }))
  );

  const [open, setOpen] = useState(false);
  const [type, setType] = useState<WeaponModeType>('one-hand');
  const [attackTypes, setAttackTypes] = useState<WeaponAttackType[]>(['melee']);
  const [attackTable, setAttackTable] = useState<string>('');
  const [fumbleTable, setFumbleTable] = useState<string>('');
  const [sizeAdjustment, setSizeAdjustment] = useState<number>(0);

  function handleAdd() {
    const mode: WeaponMode = {
      type,
      attackTypes: attackTypes,
      attackTable,
      fumbleTable,
      sizeAdjustment,
    };
    const local: LocalMode = { ...mode, id: String(Date.now()) };
    const next = [...items, local];
    setItems(next);
    // update form data weapon.modes
    setFormData((prev) => ({
      ...prev,
      weapon: {
        ...(prev.weapon || {}),
        modes: next.map(({ id: _id, ...rest }) => rest),
      },
    }));
    // reset
    setType('one-hand');
    setAttackTypes(['melee']);
    setAttackTable('');
    setFumbleTable('');
    setSizeAdjustment(0);
    setOpen(false);
  }

  function handleDelete(id: string) {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    setFormData((prev) => ({
      ...prev,
      weapon: {
        ...(prev.weapon || {}),
        modes: next.map(({ id: _id, ...rest }) => rest),
      },
    }));
  }

  useEffect(() => {
    fetchAttackTables()
      .then(setAttackTables)
      .catch((err: Error) => showError(err.message));
    fetchFumbleTables()
      .then(setFumbleTables)
      .catch((err: Error) => showError(err.message));
  }, []);

  // keep local items in sync when external formData changes
  useEffect(() => {
    const modes = formData.weapon?.modes || [];
    setItems(modes.map((m) => ({ ...m, id: String(Math.random()).slice(2) })));
  }, [formData.weapon?.modes]);

  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <h4 style={{ flex: 1, margin: 0 }}>Attack modes</h4>
          <IconButton aria-label="add" color="primary" onClick={() => setOpen(true)}>
            <AddIcon />
          </IconButton>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Type</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Attack Types</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Attack Table</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Fumble Table</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: 8 }}></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 8 }}>
                  <Typography variant="body2" color="error">
                    {t('at-least-one-mode-required')}
                  </Typography>
                </td>
              </tr>
            ) : (
              items.map((m) => (
                <tr key={m.id}>
                  <td style={{ padding: 8 }}>{t(m.type)}</td>
                  <td style={{ padding: 8 }}>{t(m.attackTypes.join(', '))}</td>
                  <td style={{ padding: 8 }}>{t(m.attackTable)}</td>
                  <td style={{ padding: 8 }}>{t(m.fumbleTable)}</td>
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
            <Grid container spacing={2}>
              <Grid size={12}>
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
              </Grid>
              <Grid size={12}>
                <FormControl component="fieldset" margin="normal">
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={attackTypes.includes('melee')}
                          onChange={() => {
                            setAttackTypes((prev) =>
                              prev.includes('melee') ? prev.filter((p) => p !== 'melee') : [...prev, 'melee']
                            );
                          }}
                        />
                      }
                      label="melee"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={attackTypes.includes('ranged')}
                          onChange={() => {
                            setAttackTypes((prev) =>
                              prev.includes('ranged') ? prev.filter((p) => p !== 'ranged') : [...prev, 'ranged']
                            );
                          }}
                        />
                      }
                      label="ranged"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={attackTypes.includes('thrown')}
                          onChange={() => {
                            setAttackTypes((prev) =>
                              prev.includes('thrown') ? prev.filter((p) => p !== 'thrown') : [...prev, 'thrown']
                            );
                          }}
                        />
                      }
                      label="thrown"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid size={12}>
                <SelectAttackTable
                  label="Attack table"
                  name="attackTable"
                  tables={attackTables}
                  value={attackTable}
                  onChange={setAttackTable}
                />
              </Grid>
              <Grid size={12}>
                <SelectFumbleTable
                  label="Fumble table"
                  name="fumbleTable"
                  tables={fumbleTables}
                  value={fumbleTable}
                  onChange={setFumbleTable}
                />
              </Grid>
              <Grid size={12}>
                <NumericInput
                  label="Size adjustment"
                  onChange={(size) => setSizeAdjustment(Number(size))}
                  value={sizeAdjustment}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleAdd} variant="contained" color="primary">
              Añadir
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
