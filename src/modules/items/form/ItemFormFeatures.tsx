import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import {
  ANY_POISON,
  CategorySeparator,
  EnumPicker,
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
import ItemFormMagic, { emptyMagicBlock } from './ItemFormMagic';
import { emptyTreasureBlock, TreasureBlock, TreasureBlockFields } from './ItemFormTreasureFeatures';

type FeatureBlock = keyof ItemFeatures;

/** i18n prefixes of the poison values. */
const LABEL_PREFIX = { category: 'poison-category-', form: 'poison-form-', severity: 'poison-severity-' };

/**
 * The block of general equipment data each category edits (spec 041; poison and antidote, spec 042), with the
 * Treasure Law blocks of spec 062. A herb may also be an antidote, and a mount an animal of the market.
 */
export const FEATURE_BLOCKS: Record<string, FeatureBlock> = {
  container: 'container',
  light: 'light',
  mount: 'transport',
  vehicle: 'transport',
  ammunition: 'ammunition',
  poison: 'poison',
  herb: 'herb',
  acid: 'acid',
  intoxicant: 'intoxicant',
  gem: 'gem',
  jewelry: 'jewelry',
  animal: 'animal',
  property: 'property',
  // Spec 067: potions and spell items are magic items
  potion: 'magic',
  'spell-item': 'magic',
};

/** Blocks a category may add with a switch (spec 062): the antidote of a herb, the animal data of a mount. */
export const OPTIONAL_BLOCKS: Record<string, FeatureBlock[]> = { herb: ['antidote'], mount: ['animal'] };

/** The optional blocks of a category: any item may be a magic item (spec 067). */
const optionalBlocks = (category: string): FeatureBlock[] => [
  ...(OPTIONAL_BLOCKS[category] ?? []),
  ...(FEATURE_BLOCKS[category] === 'magic' ? [] : (['magic'] as FeatureBlock[])),
];

const TREASURE_BLOCKS: FeatureBlock[] = ['herb', 'acid', 'intoxicant', 'gem', 'jewelry', 'animal', 'property'];
const isTreasureBlock = (block: FeatureBlock): block is TreasureBlock => TREASURE_BLOCKS.includes(block);

const emptyBlock = (block: FeatureBlock | undefined, category = ''): ItemFeatures | null => {
  if (block && isTreasureBlock(block)) return emptyTreasureBlock(block);
  switch (block) {
    case 'magic':
      return { magic: emptyMagicBlock(category) };
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

export const emptyFeatures = (category: string): ItemFeatures | null => emptyBlock(FEATURE_BLOCKS[category], category);

/** Categories whose items may be used as improvised weapons (spec 041, decision 5). */
const IMPROVISED_CATEGORIES = ['tools', 'other'];

const EMPTY_IMPROVISED_WEAPON = { skillId: '', fumble: 0, modes: [], tags: ['improvised'] };

/**
 * The general equipment data of an item (spec 041): what its category holds, lights, carries or shoots, and the
 * switch that makes a tool an improvised weapon (its modes are edited in the weapon section).
 */
const ItemFormFeatures: FC<{ formData: Item; setFormData: (item: Item) => void }> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const main = FEATURE_BLOCKS[formData.category];
  const optional = optionalBlocks(formData.category);
  const features = formData.features ?? emptyFeatures(formData.category) ?? {};
  const improvisable = IMPROVISED_CATEGORIES.includes(formData.category);
  if (!formData.category) return null;
  // Each block is edited by its own fields; an optional one shows them once its switch is on
  const blocks = [main, ...optional.filter((each) => !!features[each])].filter((each): each is FeatureBlock => !!each);
  const has = (each: FeatureBlock) => blocks.includes(each);
  // Outside the JSX: the i18n lint reads string arguments there as visible text
  const show = {
    container: has('container'),
    light: has('light'),
    transport: has('transport'),
    ammunition: has('ammunition'),
    poison: has('poison'),
    antidote: has('antidote'),
    magic: has('magic'),
  };

  const setFeatures = (next: ItemFeatures) => setFormData({ ...formData, features: { ...features, ...next } });
  const toggleBlock = (each: FeatureBlock, on: boolean) => {
    const rest = { ...features };
    delete rest[each];
    setFormData({ ...formData, features: on ? { ...rest, ...emptyBlock(each, formData.category) } : rest });
  };
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
    labelPrefix: string,
    onChange: (v: T | null) => void,
    empty = false
  ) => (
    <Grid size={{ xs: 12, md: 6 }}>
      <EnumPicker
        label={label}
        values={options}
        labelPrefix={labelPrefix}
        value={value}
        required={!empty}
        allowAll={empty}
        allLabel={empty ? t('none') : undefined}
        onChange={(v) => onChange(v as T | null)}
      />
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
      {show.container &&
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
      {show.light &&
        features.light && [
          number(t('item-feature-field-light-radius'), features.light.radius, (radius) => setLight({ radius })),
          number(t('item-feature-field-light-duration'), features.light.durationHours, (durationHours) =>
            setLight({ durationHours })
          ),
        ]}
      {show.transport &&
        features.transport && [
          number(t('item-feature-field-transport-capacity'), features.transport.capacity, (capacity) =>
            setTransport({ capacity })
          ),
          number(t('item-feature-field-transport-speed'), features.transport.speed, (speed) => setTransport({ speed })),
        ]}
      {show.ammunition && features.ammunition && (
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
      {show.poison && features.poison && (
        <>
          {select(
            t('poison-category'),
            features.poison.category,
            POISON_CATEGORIES,
            LABEL_PREFIX.category,
            (category) => category && setPoison({ category })
          )}
          {number(t('level'), features.poison.level, (level) => setPoison({ level: level ?? 0 }), true)}
          {select(
            t('poison-form'),
            features.poison.form,
            POISON_FORMS,
            LABEL_PREFIX.form,
            (form) => form && setPoison({ form })
          )}
          {select(
            t('poison-max-severity'),
            features.poison.maxSeverity,
            POISON_SEVERITIES,
            LABEL_PREFIX.severity,
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
      {show.antidote && features.antidote && (
        <>
          <Grid size={{ xs: 12, md: 6 }}>
            <EnumPicker
              mode="multiple"
              label={t('poison-categories')}
              values={[...POISON_CATEGORIES, ANY_POISON]}
              labelPrefix="poison-category-"
              value={features.antidote.categories}
              onChange={(categories) => setAntidote({ categories: categories as ItemAntidote['categories'] })}
            />
          </Grid>
          {number(t('level'), features.antidote.level, (level) => setAntidote({ level: level ?? 0 }), true)}
          {number(t('item-feature-field-antidote-within'), features.antidote.withinHours, (withinHours) =>
            setAntidote({ withinHours })
          )}
        </>
      )}
      {show.magic && (
        <ItemFormMagic
          magic={features.magic ?? emptyMagicBlock(formData.category)}
          onChange={(magic) => setFeatures({ magic })}
        />
      )}
      {blocks.filter(isTreasureBlock).map((each) => (
        <TreasureBlockFields key={each} block={each} features={features} set={setFeatures} />
      ))}
      {optional.map((each) => (
        <Grid key={`toggle-${each}`} size={12}>
          <FormControlLabel
            control={<Switch checked={!!features[each]} onChange={(_, checked) => toggleBlock(each, checked)} />}
            label={t(`item-feature-toggle-${each}`)}
          />
        </Grid>
      ))}
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
