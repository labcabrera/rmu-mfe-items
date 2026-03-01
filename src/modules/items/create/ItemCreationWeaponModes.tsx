import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';

type ModeModifier = {
  id: string;
  name: string;
  value: number;
};

type Props = {
  modes?: ModeModifier[];
  onChange?: (modes: ModeModifier[]) => void;
};

export default function ItemCreationWeaponModes({ modes = [], onChange }: Props) {
  const [items, setItems] = useState<ModeModifier[]>(modes);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState<number>(0);

  function handleAdd() {
    const newItem: ModeModifier = { id: String(Date.now()), name: name || 'mod', value };
    const next = [...items, newItem];
    setItems(next);
    onChange?.(next);
    setName('');
    setValue(0);
    setOpen(false);
  }

  function handleDelete(id: string) {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    onChange?.(next);
  }

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
              <td colSpan={3} style={{ padding: 8 }}>
                No hay modos definidos.
              </td>
            </tr>
          ) : (
            items.map((m) => (
              <tr key={m.id}>
                <td style={{ padding: 8 }}>{m.name}</td>
                <td style={{ padding: 8 }}>{m.value}</td>
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
        <DialogTitle>Añadir modificador</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Valor"
            type="number"
            fullWidth
            value={String(value)}
            onChange={(e) => setValue(Number(e.target.value))}
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
