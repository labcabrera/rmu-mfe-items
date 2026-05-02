import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Item } from '@labcabrera-rmu/rmu-react-shared-lib';
import { NumericInput } from '../../shared/inputs/NumericInput';

const ItemEditInfoAttributes: FC<{
  formData: Item;
  setFormData: Dispatch<SetStateAction<Item>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  if (!formData.info) return <p>Loading item info...</p>;

  // Helpers that assume formData.info is present and non-null
  const updateInfo = (patch: Partial<Item['info']>) =>
    setFormData((prev) => ({ ...prev, info: { ...(prev.info || {}), ...patch } }));

  const updateInfoCost = (patch: Partial<Item['info']['cost']>) =>
    setFormData((prev) => ({
      ...prev,
      info: { ...(prev.info || {}), cost: { ...((prev.info || {}).cost || {}), ...patch } },
    }));

  const info = formData.info || {};

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t('Information')}
        </Typography>
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={info.length ?? null}
          onChange={(length) => setFormData((prev) => ({ ...prev, info: { ...prev.info, length: length } }))}
          integer={false}
          label={t('Length')}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={info.weight ?? null}
          onChange={(weight) => setFormData((prev) => ({ ...prev, info: { ...prev.info, weight } }))}
          integer={false}
          label={t('Weight')}
          allowNegatives={false}
          maxFractionDigits={3}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={info.weightPercent ?? null}
          onChange={(weightPercent) => setFormData((prev) => ({ ...prev, info: { ...prev.info, weightPercent } }))}
          integer={false}
          label={t('weight-percent')}
          min={0}
          max={1000}
          maxFractionDigits={2}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={info.strength ?? null}
          onChange={(strength) => setFormData((prev) => ({ ...prev, info: { ...prev.info, strength } }))}
          integer={true}
          label={t('strength')}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={(info.cost && info.cost.min) ?? null}
          onChange={(v) => updateInfoCost({ min: v ?? 0 })}
          integer={false}
          label={t('cost-min')}
          allowNegatives={false}
          maxFractionDigits={4}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={(info.cost && info.cost.average) ?? null}
          onChange={(v) => updateInfoCost({ average: v ?? 0 })}
          integer={false}
          label={t('cost-average')}
          allowNegatives={false}
          maxFractionDigits={4}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={(info.cost && info.cost.max) ?? null}
          onChange={(v) => updateInfoCost({ max: v ?? 0 })}
          integer={false}
          label={t('cost-max')}
          allowNegatives={false}
          maxFractionDigits={4}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={info.productionHours ?? null}
          onChange={(v) => updateInfo({ productionHours: v ?? 0 })}
          integer={false}
          label={t('production-hours')}
          min={0.01}
          maxFractionDigits={2}
        />
      </Grid>
      <Grid size={6}>
        <FormControl sx={{ mt: 1 }}>
          <ToggleButtonGroup
            value={info.stackable}
            exclusive
            size="small"
            onChange={(_, val) => {
              updateInfo({ stackable: val === null ? undefined : val });
            }}
          >
            <ToggleButton value={false} size="small" sx={{ minWidth: 100 }}>
              Single
            </ToggleButton>
            <ToggleButton value={true} size="small" sx={{ minWidth: 100 }}>
              Stackable
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ItemEditInfoAttributes;
