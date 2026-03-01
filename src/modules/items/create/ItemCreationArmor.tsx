import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, Box, Typography, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateItemDto } from '../../api/item.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const ItemCreationArmor: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  const armor = formData.armor || {
    slot: '',
    at: 1,
    enc: 0,
    maneuver: 0,
    rangedPenalty: 0,
    perception: 0,
    baseDifficulty: '',
  };

  const setArmorField = (next: Partial<typeof armor>) => {
    setFormData({ ...formData, armor: { ...armor, ...next } });
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t('armor')}
        </Typography>
      </Grid>

      <Grid size={12}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Box width={200}>
            <TextField
              label={t('slot')}
              variant="standard"
              value={armor.slot || ''}
              onChange={(e) => setArmorField({ slot: e.target.value })}
              fullWidth
            />
          </Box>

          <Box width={140}>
            <NumericInput
              value={armor.at ?? null}
              onChange={(v) => setArmorField({ at: v ?? 0 })}
              integer={true}
              label={t('at')}
            />
          </Box>

          <Box width={140}>
            <NumericInput
              value={armor.enc ?? null}
              onChange={(v) => setArmorField({ enc: v ?? 0 })}
              integer={true}
              label={t('encumbrance')}
            />
          </Box>

          <Box width={160}>
            <NumericInput
              value={armor.maneuver ?? null}
              onChange={(v) => setArmorField({ maneuver: v ?? 0 })}
              integer={false}
              label={t('maneuver-penalty')}
            />
          </Box>

          <Box width={160}>
            <NumericInput
              value={armor.rangedPenalty ?? null}
              onChange={(v) => setArmorField({ rangedPenalty: v ?? 0 })}
              integer={false}
              label={t('ranged-penalty')}
            />
          </Box>

          <Box width={140}>
            <NumericInput
              value={armor.perception ?? null}
              onChange={(v) => setArmorField({ perception: v ?? 0 })}
              integer={false}
              label={t('perception')}
            />
          </Box>

          <Box width={220}>
            <TextField
              label={t('base-difficulty')}
              variant="standard"
              value={armor.baseDifficulty || ''}
              onChange={(e) => setArmorField({ baseDifficulty: e.target.value })}
              fullWidth
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ItemCreationArmor;
