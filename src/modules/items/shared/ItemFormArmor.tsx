import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { CategorySeparator } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { CreateItemDto } from '../../api/item.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectArmorSlot from '../../shared/selects/SelectArmorSlot';
import SelectArmorType from '../../shared/selects/SelectArmorType';
import SelectDifficulty from '../../shared/selects/SelectDifficulty';

const ItemFormArmor: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  if (!formData || !formData.armor) return null;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CategorySeparator text={t('Armor')} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectArmorSlot
          label={t('slot')}
          name={'slot'}
          value={formData.armor?.slot || null}
          onChange={(value) => setFormData({ ...formData, armor: { ...formData.armor, slot: value! } })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectArmorType
          value={formData.armor?.at}
          onChange={(v) => setFormData({ ...formData, armor: { ...formData.armor, at: v ?? 0 } })}
          label={t('at')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <NumericInput
          value={formData.armor?.enc ?? null}
          onChange={(v) => setFormData({ ...formData, armor: { ...formData.armor, enc: v ?? 0 } })}
          integer={true}
          label={t('encumbrance')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <NumericInput
          value={formData.armor?.maneuver ?? null}
          onChange={(v) => setFormData({ ...formData, armor: { ...formData.armor, maneuver: v ?? 0 } })}
          integer={false}
          label={t('maneuver-penalty')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <NumericInput
          value={formData.armor?.rangedPenalty ?? null}
          onChange={(v) => setFormData({ ...formData, armor: { ...formData.armor, rangedPenalty: v ?? 0 } })}
          integer={false}
          label={t('ranged-penalty')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <NumericInput
          value={formData.armor?.perception ?? null}
          onChange={(v) => setFormData({ ...formData, armor: { ...formData.armor, perception: v ?? 0 } })}
          integer={false}
          label={t('perception-penalty')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectDifficulty
          label={t('base-difficulty')}
          value={formData.armor?.baseDifficulty || ''}
          onChange={(difficulty) =>
            setFormData({ ...formData, armor: { ...formData.armor, baseDifficulty: difficulty! } })
          }
        />
      </Grid>
    </Grid>
  );
};

export default ItemFormArmor;
