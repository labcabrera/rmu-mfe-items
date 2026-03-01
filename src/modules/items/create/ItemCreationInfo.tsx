import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { t } from 'i18next';
import { CreateItemDto } from '../../api/item.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const ItemCreationInfo: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  if (!formData.info) return <p>Loading item info...</p>;

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
              value={formData.info!.cost?.min ?? null}
              onChange={(v) =>
                setFormData({ ...formData, info: { ...formData.info, cost: { ...formData.info!.cost, min: v ?? 0 } } })
              }
              integer={false}
              label={t('cost-min')}
            />
          </Box>
          <Box width={160}>
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
            />
          </Box>
          <Box width={160}>
            <NumericInput
              value={formData.info!.cost?.max ?? null}
              onChange={(v) =>
                setFormData({ ...formData, info: { ...formData.info, cost: { ...formData.info!.cost, max: v ?? 0 } } })
              }
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
              value={formData.info!.length ?? null}
              onChange={(v) => setFormData({ ...formData, info: { ...formData.info, length: v ?? 0 } })}
              integer={false}
              label={t('size')}
            />
          </Box>

          <Box width={160}>
            <NumericInput
              value={formData.info!.weight ?? null}
              onChange={(v) =>
                setFormData({ ...formData, info: { ...formData.info, weight: v === null ? undefined : v } })
              }
              integer={false}
              label={t('weight')}
            />
          </Box>

          <Box width={160}>
            <NumericInput
              value={formData.info!.weightPercent ?? null}
              onChange={(v) =>
                setFormData({ ...formData, info: { ...formData.info, weightPercent: v === null ? undefined : v } })
              }
              integer={false}
              label={t('weight-percent')}
            />
          </Box>

          <Box width={160}>
            <NumericInput
              value={formData.info!.strength ?? null}
              onChange={(v) => setFormData({ ...formData, info: { ...formData.info, strength: v ?? 0 } })}
              integer={true}
              label={t('strength')}
            />
          </Box>

          <Box width={200}>
            <NumericInput
              value={formData.info!.productionHours ?? null}
              onChange={(v) => setFormData({ ...formData, info: { ...formData.info, productionHours: v ?? 0 } })}
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
