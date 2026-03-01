import React, { Dispatch, FC, SetStateAction } from 'react';
import { FormControl, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { t } from 'i18next';
import { CreateItemDto } from '../../api/item.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const ItemCreationInfo: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  if (!formData.info) return <p>Loading item info...</p>;

  const updateWeight = (weight: number | null) => {
    const weightPercent = weight ? null : formData.info!.weightPercent;
    setFormData((prev) => ({
      ...prev,
      info: { ...prev.info, weight: weight === null ? undefined : weight, weightPercent },
    }));
  };

  const updateWeightPercent = (weightPercent: number | null) => {
    const weight = weightPercent ? null : formData.info!.weight;
    setFormData((prev) => ({
      ...prev,
      info: { ...prev.info, weight, weightPercent: weightPercent === null ? undefined : weightPercent },
    }));
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t('information')}
        </Typography>
      </Grid>

      <Grid size={3}>
        <NumericInput
          value={formData.info!.length ?? null}
          onChange={(length) => setFormData({ ...formData, info: { ...formData.info, length } })}
          integer={false}
          label={t('length')}
          maxFractionDigits={2}
          allowNegatives={false}
          min={0}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={formData.info!.weight ?? null}
          onChange={(weight) => updateWeight(weight)}
          integer={false}
          label={t('weight')}
          maxFractionDigits={3}
          allowNegatives={false}
          min={0}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={formData.info!.weightPercent ?? null}
          onChange={(weightPercent) => updateWeightPercent(weightPercent)}
          integer={false}
          label={t('weight-percent')}
          maxFractionDigits={2}
          allowNegatives={false}
          min={0}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={formData.info!.strength ?? null}
          onChange={(strength) => setFormData({ ...formData, info: { ...formData.info, strength } })}
          integer={true}
          label={t('strength')}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={formData.info!.productionHours ?? null}
          onChange={(productionHours) => setFormData({ ...formData, info: { ...formData.info, productionHours } })}
          integer={false}
          label={t('production-hours')}
          min={0.01}
          maxFractionDigits={2}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={formData.info!.cost?.min ?? null}
          onChange={(v) =>
            setFormData({
              ...formData,
              info: { ...formData.info, cost: { ...formData.info!.cost, min: v ?? 0 } },
            })
          }
          integer={false}
          label={t('cost-min')}
          min={0.0001}
          maxFractionDigits={4}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={formData.info!.cost?.average ?? null}
          onChange={(v) =>
            setFormData({
              ...formData,
              info: { ...formData.info, cost: { ...formData.info!.cost, average: v ?? 0 } },
            })
          }
          integer={false}
          label={t('cost-average')}
          min={0.0001}
          maxFractionDigits={4}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={formData.info!.cost?.max ?? null}
          onChange={(v) =>
            setFormData({
              ...formData,
              info: { ...formData.info, cost: { ...formData.info!.cost, max: v ?? 0 } },
            })
          }
          integer={false}
          label={t('cost-max')}
          min={0.0001}
          maxFractionDigits={4}
        />
      </Grid>
      <Grid size={6}>
        <FormControl sx={{ mt: 1 }}>
          <ToggleButtonGroup
            value={formData.info.stackable || false}
            exclusive
            size="small"
            onChange={(_, val) =>
              setFormData({ ...formData, info: { ...formData.info!, stackable: val === null ? undefined : val } })
            }
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

export default ItemCreationInfo;
