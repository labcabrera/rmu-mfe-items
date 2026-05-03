import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import {
  CategorySeparator,
  Item,
  ItemArmorSlot,
  NumericInput,
  RmuSelect,
  SelectDifficulty,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const ItemFormArmor: FC<{
  formData: Item;
  setFormData: Dispatch<SetStateAction<Item>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  if (!formData || !formData.armor) return null;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CategorySeparator text={t('armor')} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <RmuSelect
          label={t('slot')}
          value={formData.armor.slot || ''}
          options={['head', 'body', 'arms', 'legs']}
          error={!formData.armor.slot}
          onChange={(value) =>
            setFormData({ ...formData, armor: { ...formData.armor!, slot: value! as ItemArmorSlot } })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <RmuSelect
          label={t('at')}
          value={formData.armor.at ? `${formData.armor.at}` : ''}
          onChange={(v) => setFormData({ ...formData, armor: { ...formData.armor!, at: Number(v) } })}
          error={!formData.armor.at}
          options={['2', '3', '4', '5', '6', '7', '8', '9', '10']}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <NumericInput
          value={formData.armor?.enc ?? null}
          onChange={(v) => setFormData({ ...formData, armor: { ...formData.armor!, enc: v ?? 0 } })}
          integer={true}
          label={t('encumbrance')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <NumericInput
          value={formData.armor?.maneuverPenalty ?? null}
          onChange={(v) => setFormData({ ...formData, armor: { ...formData.armor!, maneuverPenalty: v ?? 0 } })}
          integer={false}
          label={t('maneuver-penalty')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <NumericInput
          value={formData.armor?.rangedPenalty ?? null}
          onChange={(v) => setFormData({ ...formData, armor: { ...formData.armor!, rangedPenalty: v ?? 0 } })}
          integer={false}
          label={t('ranged-penalty')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <NumericInput
          value={formData.armor?.perceptionPenalty ?? null}
          onChange={(v) => setFormData({ ...formData, armor: { ...formData.armor!, perceptionPenalty: v ?? 0 } })}
          integer={false}
          label={t('perception-penalty')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectDifficulty
          label={t('base-difficulty')}
          value={formData.armor?.baseDifficulty || ''}
          onChange={(k) => setFormData({ ...formData, armor: { ...formData.armor!, baseDifficulty: k.key } })}
        />
      </Grid>
    </Grid>
  );
};

export default ItemFormArmor;
