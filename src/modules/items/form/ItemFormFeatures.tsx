import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { CategorySeparator, Item, ItemFeatures, NumericInput } from '@labcabrera-rmu/rmu-react-shared-lib';

type FeatureBlock = keyof ItemFeatures;

/** The block of general equipment data each category edits (spec 041). */
export const FEATURE_BLOCKS: Record<string, FeatureBlock> = {
  container: 'container',
  light: 'light',
  mount: 'transport',
  vehicle: 'transport',
  ammunition: 'ammunition',
};

export const emptyFeatures = (category: string): ItemFeatures | null => {
  switch (FEATURE_BLOCKS[category]) {
    case 'container':
      return { container: { weight: null, volume: null, liquid: null, units: null } };
    case 'light':
      return { light: { radius: null, durationHours: null } };
    case 'transport':
      return { transport: { capacity: null, speed: null } };
    case 'ammunition':
      return { ammunition: { launchers: [], sizeAdjustment: 0 } };
    default:
      return null;
  }
};

/** Categories whose items may be used as improvised weapons (spec 041, decision 5). */
const IMPROVISED_CATEGORIES = ['tools', 'other'];

const EMPTY_IMPROVISED_WEAPON = { skillId: '', fumble: 0, modes: [], tags: ['improvised'] };

/**
 * The general equipment data of an item (spec 041): what its category holds, lights, carries or shoots, and the
 * switch that makes a tool an improvised weapon (its modes are edited in the weapon section).
 */
const ItemFormFeatures: FC<{ formData: Item; setFormData: (item: Item) => void }> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const block = FEATURE_BLOCKS[formData.category];
  const features = formData.features ?? emptyFeatures(formData.category) ?? {};
  const improvisable = IMPROVISED_CATEGORIES.includes(formData.category);
  if (!block && !improvisable) return null;

  const setFeatures = (next: ItemFeatures) => setFormData({ ...formData, features: { ...features, ...next } });
  const setContainer = (patch: Partial<NonNullable<ItemFeatures['container']>>) =>
    setFeatures({ container: { ...features.container!, ...patch } });
  const setLight = (patch: Partial<NonNullable<ItemFeatures['light']>>) =>
    setFeatures({ light: { ...features.light!, ...patch } });
  const setTransport = (patch: Partial<NonNullable<ItemFeatures['transport']>>) =>
    setFeatures({ transport: { ...features.transport!, ...patch } });
  const setAmmunition = (patch: Partial<NonNullable<ItemFeatures['ammunition']>>) =>
    setFeatures({ ammunition: { ...features.ammunition!, ...patch } });

  const number = (
    label: string,
    value: number | null | undefined,
    onChange: (v: number | null) => void,
    integer = false
  ) => (
    <Grid size={{ xs: 12, md: 3 }}>
      <NumericInput
        label={label}
        value={value ?? null}
        onChange={onChange}
        integer={integer}
        maxFractionDigits={4}
        allowNegatives={false}
        min={0}
      />
    </Grid>
  );

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CategorySeparator text={t('item-features')} />
      </Grid>
      {block === 'container' &&
        features.container && [
          number(t('item-feature-field-container-weight'), features.container.weight, (weight) =>
            setContainer({ weight })
          ),
          number(t('item-feature-field-container-volume'), features.container.volume, (volume) =>
            setContainer({ volume })
          ),
          number(t('item-feature-field-container-liquid'), features.container.liquid, (liquid) =>
            setContainer({ liquid })
          ),
          number(
            t('item-feature-field-container-units'),
            features.container.units,
            (units) => setContainer({ units }),
            true
          ),
        ]}
      {block === 'light' &&
        features.light && [
          number(t('item-feature-field-light-radius'), features.light.radius, (radius) => setLight({ radius })),
          number(t('item-feature-field-light-duration'), features.light.durationHours, (durationHours) =>
            setLight({ durationHours })
          ),
        ]}
      {block === 'transport' &&
        features.transport && [
          number(t('item-feature-field-transport-capacity'), features.transport.capacity, (capacity) =>
            setTransport({ capacity })
          ),
          number(t('item-feature-field-transport-speed'), features.transport.speed, (speed) => setTransport({ speed })),
        ]}
      {block === 'ammunition' && features.ammunition && (
        <>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              size="small"
              fullWidth
              label={t('item-feature-field-ammunition-launchers')}
              helperText={t('item-feature-field-ammunition-launchers-help')}
              value={features.ammunition.launchers.join(', ')}
              onChange={(e) =>
                setAmmunition({
                  launchers: e.target.value
                    .split(',')
                    .map((id) => id.trim())
                    .filter((id) => id),
                })
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <NumericInput
              label={t('size-adjustment')}
              value={features.ammunition.sizeAdjustment}
              onChange={(sizeAdjustment) => setAmmunition({ sizeAdjustment: sizeAdjustment ?? 0 })}
              integer
            />
          </Grid>
        </>
      )}
      {improvisable && (
        <Grid size={12}>
          <FormControlLabel
            control={<Switch checked={!!formData.weapon} disabled={!!formData.weapon && !!formData.id} />}
            label={t('item-improvised-weapon')}
            onChange={(_, checked) =>
              setFormData({ ...formData, weapon: checked ? { ...EMPTY_IMPROVISED_WEAPON } : undefined } as Item)
            }
          />
        </Grid>
      )}
    </Grid>
  );
};

export default ItemFormFeatures;
