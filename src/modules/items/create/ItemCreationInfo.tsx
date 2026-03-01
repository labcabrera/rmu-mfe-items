import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { t } from 'i18next';
import { CreateItemDto } from '../../api/item.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const ItemCreationInfo: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  const info = formData.info || {
    cost: { min: 0, average: 0, max: 0 },
    length: 0,
    weight: undefined,
    weightPercent: undefined,
    strength: 0,
    productionHours: 0,
  };

  const setCostField = (field: 'min' | 'average' | 'max', value: number | null) => {
    const next = value === null ? 0 : value;
    setFormData({ ...formData, info: { ...info, cost: { ...info.cost, [field]: next } } });
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t('information')}
        </Typography>
      </Grid>

      <Grid size={12}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Box width={160}>
            <NumericInput
              value={info.cost?.min ?? null}
              onChange={(v) => setCostField('min', v)}
              integer={false}
              label={t('cost-min')}
            />
          </Box>
          <Box width={160}>
            <NumericInput
              value={info.cost?.average ?? null}
              onChange={(v) => setCostField('average', v)}
              integer={false}
              label={t('cost-average')}
            />
          </Box>
          <Box width={160}>
            <NumericInput
              value={info.cost?.max ?? null}
              onChange={(v) => setCostField('max', v)}
              integer={false}
              label={t('cost-max')}
            />
          </Box>
        </Box>
      </Grid>

      <Grid size={12}>
        <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
          <Box width={160}>
            <NumericInput
              value={info.length ?? null}
              onChange={(v) => setFormData({ ...formData, info: { ...info, length: v ?? 0 } })}
              integer={false}
              label={t('size')}
            />
          </Box>

          <Box width={160}>
            <NumericInput
              value={info.weight ?? null}
              onChange={(v) => setFormData({ ...formData, info: { ...info, weight: v === null ? undefined : v } })}
              integer={false}
              label={t('weight')}
            />
          </Box>

          <Box width={160}>
            <NumericInput
              value={info.weightPercent ?? null}
              onChange={(v) =>
                setFormData({ ...formData, info: { ...info, weightPercent: v === null ? undefined : v } })
              }
              integer={false}
              label={t('weight-percent')}
            />
          </Box>

          <Box width={160}>
            <NumericInput
              value={info.strength ?? null}
              onChange={(v) => setFormData({ ...formData, info: { ...info, strength: v ?? 0 } })}
              integer={true}
              label={t('strength')}
            />
          </Box>

          <Box width={200}>
            <NumericInput
              value={info.productionHours ?? null}
              onChange={(v) => setFormData({ ...formData, info: { ...info, productionHours: v ?? 0 } })}
              integer={true}
              label={t('production-hours')}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ItemCreationInfo;
