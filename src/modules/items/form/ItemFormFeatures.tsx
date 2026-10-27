import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, MenuItem, Switch, TextField } from '@mui/material';
import {
  ANY_POISON,
  CategorySeparator,
  Item,
  ItemAntidote,
  ItemFeatures,
  ItemPoison,
  NumericInput,
  POISON_CATEGORIES,
  POISON_FORMS,
  POISON_SEVERITIES,
  PoisonRange,
} from '@labcabrera-rmu/rmu-react-shared-lib';

type FeatureBlock = keyof ItemFeatures;

/** The block of general equipment data each category edits (spec 041; poison and antidote, spec 042). */
export const FEATURE_BLOCKS: Record<string, FeatureBlock> = {
  container: 'container',
  light: 'light',
  mount: 'transport',
  vehicle: 'transport',
  ammunition: 'ammunition',
  poison: 'poison',
  herb: 'antidote',
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
    case 'poison':
      return {
        poison: {
          category: 'muscle',
          level: 1,
          form: 'liquid',
          maxSeverity: null,
          immediateHits: null,
          onsetRounds: null,
        },
      };
    case 'antidote':
      return { antidote: { categories: [], level: 1, withinHours: null } };
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
  const setPoison = (patch: Partial<ItemPoison>) => setFeatures({ poison: { ...features.poison!, ...patch } });
  const setAntidote = (patch: Partial<ItemAntidote>) => setFeatures({ antidote: { ...features.antidote!, ...patch } });
  const range = (value: PoisonRange | null, patch: Partial<PoisonRange>): PoisonRange | null => {
    const next = { min: value?.min ?? 0, max: value?.max ?? 0, ...patch };
    return next.min || next.max ? next : null;
  };
  const select = <T extends string>(
    label: string,
    value: T | null,
    options: readonly T[],
    labelOf: (option: T) => string,
    onChange: (v: T | null) => void,
    empty = false
  ) => (
    <Grid size={{ xs: 12, md: 3 }}>
      <TextField
        select
        size="small"
        fullWidth
        label={label}
        value={value ?? ''}
        onChange={(e) => onChange((e.target.value || null) as T | null)}
      >
        {empty && <MenuItem value="">-</MenuItem>}
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {labelOf(option)}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );

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
      {block === 'poison' && features.poison && (
        <>
          {select(
            t('poison-category'),
            features.poison.category,
            POISON_CATEGORIES,
            (category) => t(`poison-category-${category}`),
            (category) => category && setPoison({ category })
          )}
          {number(t('level'), features.poison.level, (level) => setPoison({ level: level ?? 0 }), true)}
          {select(
            t('poison-form'),
            features.poison.form,
            POISON_FORMS,
            (form) => t(`poison-form-${form}`),
            (form) => form && setPoison({ form })
          )}
          {select(
            t('poison-max-severity'),
            features.poison.maxSeverity,
            POISON_SEVERITIES,
            (severity) => t(`poison-severity-${severity}`),
            (maxSeverity) => setPoison({ maxSeverity }),
            true
          )}
          {number(
            t('item-feature-field-poison-hits-min'),
            features.poison.immediateHits?.min,
            (min) => setPoison({ immediateHits: range(features.poison!.immediateHits, { min: min ?? 0 }) }),
            true
          )}
          {number(
            t('item-feature-field-poison-hits-max'),
            features.poison.immediateHits?.max,
            (max) => setPoison({ immediateHits: range(features.poison!.immediateHits, { max: max ?? 0 }) }),
            true
          )}
          {number(
            t('item-feature-field-poison-onset-min'),
            features.poison.onsetRounds?.min,
            (min) => setPoison({ onsetRounds: range(features.poison!.onsetRounds, { min: min ?? 0 }) }),
            true
          )}
          {number(
            t('item-feature-field-poison-onset-max'),
            features.poison.onsetRounds?.max,
            (max) => setPoison({ onsetRounds: range(features.poison!.onsetRounds, { max: max ?? 0 }) }),
            true
          )}
        </>
      )}
      {block === 'antidote' && features.antidote && (
        <>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              size="small"
              fullWidth
              label={t('poison-categories')}
              value={features.antidote.categories}
              slotProps={{ select: { multiple: true } }}
              onChange={(e) => setAntidote({ categories: e.target.value as unknown as ItemAntidote['categories'] })}
            >
              {[...POISON_CATEGORIES, ANY_POISON].map((category) => (
                <MenuItem key={category} value={category}>
                  {t(`poison-category-${category}`)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {number(t('level'), features.antidote.level, (level) => setAntidote({ level: level ?? 0 }), true)}
          {number(t('item-feature-field-antidote-within'), features.antidote.withinHours, (withinHours) =>
            setAntidote({ withinHours })
          )}
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
