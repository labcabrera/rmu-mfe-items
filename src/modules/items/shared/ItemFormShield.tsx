import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CategorySeparator, Item } from '@labcabrera-rmu/rmu-react-shared-lib';
import { NumericInput } from '../../shared/inputs/NumericInput';

const ItemFormShield: FC<{
  formData: Item;
  setFormData: Dispatch<SetStateAction<Item>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  if (!formData || !formData.shield) return null;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CategorySeparator text={t('Shield')} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <NumericInput
          value={formData.shield.db ?? null}
          onChange={(v) => setFormData({ ...formData, shield: { ...formData.shield!, db: v || 0 } })}
          integer={true}
          label={t('Defensive bonus')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <NumericInput
          value={formData.shield.blockCount ?? null}
          onChange={(v) => setFormData({ ...formData, shield: { ...formData.shield!, blockCount: v || 0 } })}
          integer={true}
          label={t('Block count')}
        />
      </Grid>
    </Grid>
  );
};

export default ItemFormShield;
