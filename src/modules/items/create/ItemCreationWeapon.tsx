import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, Box, Typography, TextField, Stack } from '@mui/material';
import { t } from 'i18next';
import { CreateItemDto, WeaponMode } from '../../api/item.dto';
import AddButton from '../../shared/buttons/AddButton';
import DeleteButton from '../../shared/buttons/DeleteButton';
import { NumericInput } from '../../shared/inputs/NumericInput';

const emptyMode = (): WeaponMode => ({
  type: '',
  attackTypes: [],
  attackTable: '',
  fumbleTable: '',
  sizeAdjustment: 0,
});

const ItemCreationWeapon: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  const weapon = formData.weapon || { skillId: '', fumble: 0, modes: [] };

  const setWeapon = (next: Partial<typeof weapon>) => setFormData({ ...formData, weapon: { ...weapon, ...next } });

  const setMode = (idx: number, next: Partial<WeaponMode>) => {
    const modes = [...(weapon.modes || [])];
    modes[idx] = { ...modes[idx], ...next };
    setWeapon({ modes });
  };

  const addMode = () => setWeapon({ modes: [...(weapon.modes || []), emptyMode()] });

  const removeMode = (idx: number) => {
    const modes = [...(weapon.modes || [])];
    modes.splice(idx, 1);
    setWeapon({ modes });
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t('weapon')}
        </Typography>
      </Grid>

      <Grid size={12}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Box width={320}>
            <TextField
              label={t('skill')}
              variant="standard"
              value={weapon.skillId || ''}
              onChange={(e) => setWeapon({ skillId: e.target.value })}
              fullWidth
            />
          </Box>

          <Box width={160}>
            <NumericInput
              value={weapon.fumble ?? null}
              onChange={(v) => setWeapon({ fumble: v ?? 0 })}
              integer={true}
              label={t('fumble')}
            />
          </Box>
        </Box>
      </Grid>

      <Grid size={12}>
        <Typography variant="subtitle1">{t('attack-modes') || 'Attack modes'}</Typography>
      </Grid>

      <Grid size={12}>
        <Stack spacing={2}>
          {(weapon.modes || []).map((mode, idx) => (
            <Box key={idx} display="flex" gap={2} alignItems="center" flexWrap="wrap">
              <Box width={160}>
                <TextField
                  label={t('attack-type')}
                  variant="standard"
                  value={mode.type || ''}
                  onChange={(e) => setMode(idx, { type: e.target.value })}
                  fullWidth
                />
              </Box>

              <Box width={260}>
                <TextField
                  label={t('attack-types') || 'Attack types'}
                  variant="standard"
                  value={mode.attackTypes ? mode.attackTypes.join(', ') : ''}
                  onChange={(e) =>
                    setMode(idx, {
                      attackTypes: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  fullWidth
                />
              </Box>

              <Box width={200}>
                <TextField
                  label={t('attack-table')}
                  variant="standard"
                  value={mode.attackTable || ''}
                  onChange={(e) => setMode(idx, { attackTable: e.target.value })}
                  fullWidth
                />
              </Box>

              <Box width={200}>
                <TextField
                  label={t('fumble-table')}
                  variant="standard"
                  value={mode.fumbleTable || ''}
                  onChange={(e) => setMode(idx, { fumbleTable: e.target.value })}
                  fullWidth
                />
              </Box>

              <Box width={120}>
                <NumericInput
                  value={mode.sizeAdjustment ?? null}
                  onChange={(v) => setMode(idx, { sizeAdjustment: v ?? 0 })}
                  integer={true}
                  label={t('size-adjustment')}
                />
              </Box>

              <DeleteButton onClick={() => removeMode(idx)} />
            </Box>
          ))}

          <Box>
            <AddButton onClick={addMode} />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ItemCreationWeapon;
