import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Switch } from '@mui/material';
import {
  ARMOR_CLASSES,
  ARMOR_TYPES,
  CategorySeparator,
  DifficultyPicker,
  EnumPicker,
  Item,
  ItemArmorClass,
  ItemArmorSlot,
  NumericInput,
} from '@labcabrera-rmu/rmu-react-shared-lib';

/** Spec 041: a full suit covers the four slots. */
const FULL_SUIT: ItemArmorSlot[] = ['body', 'head', 'arms', 'legs'];
const ARMOR_SLOTS: ItemArmorSlot[] = ['head', 'body', 'arms', 'legs'];
const slotImages: Record<string, string> = {
  head: 'images/items/category-head.png',
  body: 'images/items/category-body.png',
  arms: 'images/items/category-arms.png',
  legs: 'images/items/category-legs.png',
};

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
      <Grid size={{ xs: 12, md: 6 }}>
        <EnumPicker
          label={t('slot')}
          values={ARMOR_SLOTS}
          images={slotImages}
          required
          value={formData.armor.slot || null}
          onChange={(slot) =>
            slot && setFormData({ ...formData, armor: { ...formData.armor!, slot: slot as ItemArmorSlot } })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <EnumPicker
          label={t('at')}
          values={ARMOR_TYPES}
          variant="tiles"
          required
          value={formData.armor.at ? `${formData.armor.at}` : null}
          onChange={(at) => at && setFormData({ ...formData, armor: { ...formData.armor!, at: Number(at) } })}
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
      <Grid size={{ xs: 12, md: 6 }}>
        <EnumPicker
          label={t('armor-class')}
          values={ARMOR_CLASSES}
          labelPrefix="item-armor-class-"
          allowAll
          allLabel={t('none')}
          value={formData.armor.class || null}
          onChange={(value) =>
            setFormData({ ...formData, armor: { ...formData.armor!, class: (value || undefined) as ItemArmorClass } })
          }
        />
      </Grid>
      <Grid size={12}>
        <DifficultyPicker
          value={formData.armor?.baseDifficulty || null}
          onChange={(baseDifficulty) => setFormData({ ...formData, armor: { ...formData.armor!, baseDifficulty } })}
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
