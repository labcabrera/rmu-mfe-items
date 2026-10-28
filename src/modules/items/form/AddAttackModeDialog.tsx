/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import {
  AttackTablePicker,
  EnumPicker,
  FumbleTablePicker,
  NumericInput,
  TechnicalInfo,
  WEAPON_ATTACKS,
  WEAPON_HANDS,
  WeaponAttackType,
  WeaponMode,
  WeaponModeType,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const emptyForm = {
  type: 'one-hand',
  attackTypes: [],
  attackTable: '',
  fumbleTable: '',
  sizeAdjustment: 0,
} as unknown as WeaponMode;

const AddAttackModeDialog: FC<{
  open: boolean;
  onModeAdded: (mode: WeaponMode) => void;
  onClose: () => void;
}> = ({ open, onClose, onModeAdded }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<WeaponMode>(emptyForm);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const handleClose = () => {
    setFormData(emptyForm);
    onClose();
  };

  const handleAdd = () => {
    onModeAdded(formData);
    setFormData(emptyForm);
    onClose();
  };

  const validateForm = () => {
    if (!formData.attackTypes || formData.attackTypes.length === 0) return false;
    if (!formData.attackTable || formData.attackTable === '') return false;
    if (!formData.fumbleTable || formData.fumbleTable === '') return false;
    return true;
  };

  useEffect(() => {
    setIsValidForm(validateForm());
  }, [formData]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{t('add-attack-mode')}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid size={12}>
            <EnumPicker
              label={t('type')}
              values={WEAPON_HANDS}
              required
              value={formData.type}
              onChange={(type) => type && setFormData({ ...formData, type: type as WeaponModeType })}
            />
          </Grid>
          <Grid size={12}>
            <EnumPicker
              mode="multiple"
              label={t('attack-types')}
              values={WEAPON_ATTACKS}
              value={formData.attackTypes}
              onChange={(types) => setFormData({ ...formData, attackTypes: types as WeaponAttackType[] })}
            />
          </Grid>
          <Grid size={12}>
            <AttackTablePicker
              name="attackTable"
              required
              value={formData.attackTable || null}
              onChange={(attackTable) => setFormData({ ...formData, attackTable: attackTable || '' })}
            />
          </Grid>
          <Grid size={12}>
            <FumbleTablePicker
              name="fumbleTable"
              required
              value={formData.fumbleTable || null}
              onChange={(fumbleTable) => setFormData({ ...formData, fumbleTable: fumbleTable || '' })}
            />
          </Grid>
          <Grid size={12}>
            <NumericInput
              label={t('size-adjustment')}
              value={formData.sizeAdjustment}
              onChange={(e) => setFormData({ ...formData, sizeAdjustment: e || 0 })}
            />
          </Grid>
          <Grid size={12}>
            <NumericInput
              label={t('ob-modifier')}
              value={formData.obModifier ?? null}
              onChange={(e) => setFormData({ ...formData, obModifier: e || undefined })}
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
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button onClick={handleAdd} variant="contained" disabled={!isValidForm}>
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAttackModeDialog;
