import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Switch } from '@mui/material';
import {
  CategorySeparator,
  Item,
  ItemArmorClass,
  ItemArmorSlot,
  NumericInput,
  RmuSelect,
  SelectDifficulty,
} from '@labcabrera-rmu/rmu-react-shared-lib';

/** Spec 041: a full suit covers the four slots. */
const FULL_SUIT: ItemArmorSlot[] = ['body', 'head', 'arms', 'legs'];
const ARMOR_CLASSES: ItemArmorClass[] = ['light', 'medium', 'heavy'];

const ItemFormArmor: FC<{
  formData: Item;
  setFormData: (item: Item) => void;
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
      <Grid size={{ xs: 12, md: 3 }}>
        <RmuSelect
          label={t('armor-class')}
          value={formData.armor.class || ''}
          options={['', ...ARMOR_CLASSES]}
          onChange={(value) =>
            setFormData({ ...formData, armor: { ...formData.armor!, class: (value || undefined) as ItemArmorClass } })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <FormControlLabel
          control={<Switch checked={(formData.armor.coverage?.length ?? 0) > 1} />}
          label={t('item-feature-full-suit')}
          onChange={(_, checked) =>
            setFormData({
              ...formData,
              armor: {
                ...formData.armor!,
                slot: checked ? 'body' : formData.armor!.slot,
                coverage: checked ? FULL_SUIT : undefined,
              },
            })
          }
        />
      </Grid>
    </Grid>
  );
};

export default ItemFormArmor;
