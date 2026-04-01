/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { NumericInput, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { WeaponAttackType, WeaponMode, WeaponModeType } from '../../api/item.dto';
import SelectAttackTable from '../../shared/selects/SelectAttackTable';
import SelectFumbleTable from '../../shared/selects/SelectFumbleTable';

const attackTypes = ['melee', 'ranged', 'thrown'] as WeaponAttackType[];
const types = ['one-hand', 'two-hands'] as WeaponModeType[];
const emptyForm = {
  type: 'one-hand',
  attackTypes: [],
  attackTable: '',
  fumbleTable: '',
  sizeAdjustment: 0,
} as WeaponMode;

const AddAttackModeDialog: FC<{
  open: boolean;
  onModeAdded: (mode: WeaponMode) => void;
  onClose: () => void;
}> = ({ open, onClose, onModeAdded }) => {
  const [formData, setFormData] = useState<WeaponMode>(emptyForm);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const handleClose = () => {
    setFormData(emptyForm);
    onClose();
  };

  const handleAdd = () => {
    onModeAdded(formData);
    setFormData(emptyForm);
  };

  const validateForm = () => {
    if (!formData.attackTypes || formData.attackTypes.length === 0) return false;
    if (!formData.attackTable || formData.attackTable === '') return false;
    if (!formData.fumbleTable || formData.fumbleTable === '') return false;
    return true;
  };

  const onTypeChange = (type: WeaponAttackType) => {
    let newTypes = formData.attackTypes;
    if (formData.attackTypes.includes(type)) {
      newTypes = newTypes.filter((e) => e !== type);
    } else {
      newTypes.push(type);
    }
    setFormData({ ...formData, attackTypes: newTypes });
  };

  useEffect(() => {
    setIsValidForm(validateForm());
  }, [formData]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{t('Add skill')}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid size={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="mode-type-label">Tipo</InputLabel>
              <Select
                labelId="mode-type-label"
                value={formData.type}
                label={t('Type')}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                {types.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {t(type)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
              <ToggleButtonGroup value={formData.attackTypes}>
                {attackTypes.map((option, index) => (
                  <ToggleButton
                    key={index}
                    value={option}
                    onClick={() => onTypeChange(option)}
                    size="small"
                    sx={{ minWidth: 160 }}
                    selected={formData.attackTypes.includes(option)}
                  >
                    {t(option)}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <SelectAttackTable
              label="Attack table"
              name="attackTable"
              value={formData.attackTable}
              onChange={(e) => setFormData({ ...formData, attackTable: e || '' })}
            />
          </Grid>
          <Grid size={12}>
            <SelectFumbleTable
              label="Fumble table"
              name="fumbleTable"
              value={formData.fumbleTable}
              onChange={(e) => setFormData({ ...formData, fumbleTable: e || '' })}
            />
          </Grid>
          <Grid size={12}>
            <NumericInput
              label="Size adjustment"
              value={formData.sizeAdjustment}
              onChange={(e) => setFormData({ ...formData, sizeAdjustment: e || 0 })}
            />
          </Grid>
          <Grid size={12}>
            <TechnicalInfo>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </TechnicalInfo>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('Cancel')}</Button>
        <Button onClick={handleAdd} variant="contained" disabled={!isValidForm}>
          {t('Add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAttackModeDialog;
