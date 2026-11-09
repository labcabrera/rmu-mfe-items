import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import {
  ACID_STRENGTHS,
  ACID_TARGETS,
  ANIMAL_STAGES,
  ANY_INJURY,
  CRITICAL_SEVERITIES,
  EnumPicker,
  GEM_GRADES,
  HERB_BIOMES,
  HERB_EFFECT_DELAYS,
  HERB_GROUPS,
  HERB_INJURY_KINDS,
  HERB_PREPS,
  HerbEffects,
  ITEM_DIFFICULTY_CODES,
  ItemAcid,
  ItemAnimal,
  ItemFeatures,
  ItemGem,
  ItemHerb,
  ItemIntoxicant,
  ItemJewelry,
  ItemProperty,
  NumberRange,
  NumericInput,
} from '@labcabrera-rmu/rmu-react-shared-lib';

/** The Treasure Law blocks of spec 062. */
export type TreasureBlock = 'herb' | 'acid' | 'intoxicant' | 'gem' | 'jewelry' | 'animal' | 'property';

/** A new block with neutral values for the admin to fill. */
export const emptyTreasureBlock = (block: TreasureBlock): ItemFeatures => {
  switch (block) {
    case 'herb':
      return {
        herb: {
          group: 'general',
          biomes: [],
          highAltitude: false,
          find: 'm',
          form: '',
          prep: 'ingest',
          season: null,
          effectDelay: 'immediate',
          magical: true,
          addictionFactor: null,
          effects: null,
        },
      };
    case 'acid':
      return {
        acid: {
          strength: 'mild',
          splash: null,
          immersion: null,
          ingestion: null,
          breakageMod: 0,
          craftDifficulty: 'm',
          targets: 'any',
        },
      };
    case 'intoxicant':
      return { intoxicant: { addictionFactor: null, form: null, prep: null } };
    case 'gem':
      return {
        gem: {
          grade: 'semi-precious',
          mineral: '',
          valuePerCarat: 0,
          hardness: null,
          specificGravity: null,
          luster: null,
          caratsPerCm: null,
          magic: null,
        },
      };
    case 'jewelry':
      return { jewelry: { value: { min: 1, max: 1, dice: null, openEnded: false }, slot: null } };
    case 'animal':
      return { animal: { npcId: null, trained: true, stage: 'adult', domesticated: true } };
    case 'property':
      return { property: { rent: null, size: null, height: null } };
  }
};

type Setter = (next: ItemFeatures) => void;

const textOrNull = (value: string): string | null => (value.trim() ? value : null);

/** Field helpers bound to the translations; each returns a Grid cell. */
const useFields = () => {
  const { t } = useTranslation();
  const select = (
    key: string,
    label: string,
    value: string | null,
    values: readonly string[],
    labelPrefix: string,
    onChange: (value: string | null) => void,
    empty = false
  ) => (
    <Grid key={key} size={{ xs: 12, md: 6 }}>
      <EnumPicker
        label={label}
        values={values}
        labelPrefix={labelPrefix}
        value={value}
        required={!empty}
        allowAll={empty}
        allLabel={empty ? t('none') : undefined}
        onChange={(next) => onChange(next as string | null)}
      />
    </Grid>
  );
  const multiple = (
    key: string,
    label: string,
    value: string[],
    values: readonly string[],
    labelPrefix: string,
    onChange: (value: string[]) => void
  ) => (
    <Grid key={key} size={{ xs: 12, md: 6 }}>
      <EnumPicker
        mode="multiple"
        label={label}
        values={values}
        labelPrefix={labelPrefix}
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
  const number = (
    key: string,
    label: string,
    value: number | null | undefined,
    onChange: (value: number | null) => void,
    { integer = false, negatives = false }: { integer?: boolean; negatives?: boolean } = {}
  ) => (
    <Grid key={key} size={{ xs: 6, md: 3 }}>
      <NumericInput
        label={label}
        value={value ?? null}
        onChange={onChange}
        integer={integer}
        maxFractionDigits={4}
        allowNegatives={negatives}
        min={negatives ? undefined : 0}
      />
    </Grid>
  );
  const text = (key: string, label: string, value: string | null, onChange: (value: string | null) => void) => (
    <Grid key={key} size={{ xs: 12, md: 6 }}>
      <TextField
        size="small"
        fullWidth
        label={label}
        value={value ?? ''}
        onChange={(e) => onChange(textOrNull(e.target.value))}
      />
    </Grid>
  );
  const flag = (key: string, label: string, value: boolean, onChange: (value: boolean) => void) => (
    <Grid key={key} size={{ xs: 12, md: 3 }}>
      <FormControlLabel
        control={<Switch checked={value} onChange={(_, checked) => onChange(checked)} />}
        label={label}
      />
    </Grid>
  );
  /** A min-max range: null when both are empty. */
  const range = (
    key: string,
    label: string,
    value: NumberRange | null,
    onChange: (value: NumberRange | null) => void,
    integer = false
  ): ReactNode[] => {
    const set = (patch: Partial<NumberRange>) => {
      const next = { min: value?.min ?? 0, max: value?.max ?? 0, ...patch };
      onChange(next.min || next.max ? next : null);
    };
    return [
      number(`${key}-min`, `${label} (${t('min')})`, value?.min, (min) => set({ min: min ?? 0 }), { integer }),
      number(`${key}-max`, `${label} (${t('max')})`, value?.max, (max) => set({ max: max ?? 0 }), { integer }),
    ];
  };
  return { t, select, multiple, number, text, flag, range };
};

const HerbFields: FC<{ herb: ItemHerb; set: Setter }> = ({ herb, set }) => {
  const { t, select, multiple, number, text, flag, range } = useFields();
  const patch = (next: Partial<ItemHerb>) => set({ herb: { ...herb, ...next } });
  const effects: HerbEffects = herb.effects ?? { heal: null, stunRelief: null, treats: null, recoveryBonus: null };
  const setEffects = (next: Partial<HerbEffects>) => {
    const merged = { ...effects, ...next };
    const empty = !merged.heal && !merged.stunRelief && !merged.treats?.length && !merged.recoveryBonus;
    patch({ effects: empty ? null : merged });
  };
  const cells: ReactNode[] = [
    select('group', t('herb-group'), herb.group, HERB_GROUPS, 'herb-group-', (group) =>
      patch({ group: (group ?? 'general') as ItemHerb['group'] })
    ),
    multiple('biomes', t('npc-biomes'), herb.biomes, HERB_BIOMES, 'npc-biome-', (biomes) =>
      patch({ biomes: biomes as ItemHerb['biomes'] })
    ),
    select('find', t('herb-find'), herb.find, ITEM_DIFFICULTY_CODES, 'difficulty-', (find) =>
      patch({ find: (find ?? 'm') as ItemHerb['find'] })
    ),
    select('prep', t('herb-prep'), herb.prep, HERB_PREPS, 'herb-prep-', (prep) =>
      patch({ prep: (prep ?? 'ingest') as ItemHerb['prep'] })
    ),
    text('form', t('herb-form-key'), herb.form, (form) => patch({ form: form ?? '' })),
    text('season', t('herb-season'), herb.season, (season) => patch({ season })),
    select('delay', t('herb-effect-delay'), herb.effectDelay, HERB_EFFECT_DELAYS, 'herb-effect-delay-', (delay) =>
      patch({ effectDelay: (delay ?? 'immediate') as ItemHerb['effectDelay'] })
    ),
    number('addiction', t('addiction-factor'), herb.addictionFactor, (addictionFactor) => patch({ addictionFactor }), {
      integer: true,
      negatives: true,
    }),
    flag('altitude', t('herb-high-altitude'), herb.highAltitude, (highAltitude) => patch({ highAltitude })),
    flag('magical', t('herb-magical'), herb.magical, (magical) => patch({ magical })),
    range('heal', t('herb-heal'), effects.heal, (heal) => setEffects({ heal }), true),
    number('stun', t('herb-stun-relief'), effects.stunRelief, (stunRelief) => setEffects({ stunRelief }), {
      integer: true,
    }),
    number(
      'recovery',
      t('herb-recovery-bonus'),
      effects.recoveryBonus,
      (recoveryBonus) => setEffects({ recoveryBonus }),
      { integer: true, negatives: true }
    ),
    <Grid key="treats" size={{ xs: 12, md: 6 }}>
      <EnumPicker
        mode="multiple"
        label={t('herb-treats')}
        values={HERB_INJURY_KINDS}
        formatLabel={(type) => t(type === ANY_INJURY ? 'herb-treats-any' : `injury-type-${type}`)}
        value={effects.treats ?? []}
        onChange={(treats) => setEffects({ treats: treats.length ? (treats as HerbEffects['treats']) : null })}
      />
    </Grid>,
  ];
  return <>{cells}</>;
};

const AcidFields: FC<{ acid: ItemAcid; set: Setter }> = ({ acid, set }) => {
  const { t, select, number } = useFields();
  const patch = (next: Partial<ItemAcid>) => set({ acid: { ...acid, ...next } });
  const splash = acid.splash;
  const immersion = acid.immersion;
  const ingestion = acid.ingestion;
  const cells: ReactNode[] = [
    select('strength', t('acid-strength'), acid.strength, ACID_STRENGTHS, 'acid-strength-', (strength) =>
      patch({ strength: (strength ?? 'mild') as ItemAcid['strength'] })
    ),
    select('targets', t('acid-targets'), acid.targets, ACID_TARGETS, 'acid-targets-', (targets) =>
      patch({ targets: (targets ?? 'any') as ItemAcid['targets'] })
    ),
    select(
      'craft',
      t('acid-craft-difficulty'),
      acid.craftDifficulty,
      ITEM_DIFFICULTY_CODES,
      'difficulty-',
      (craftDifficulty) => patch({ craftDifficulty: (craftDifficulty ?? 'm') as ItemAcid['craftDifficulty'] })
    ),
    number(
      'breakage',
      t('acid-breakage-mod'),
      acid.breakageMod,
      (breakageMod) => patch({ breakageMod: breakageMod ?? 0 }),
      {
        integer: true,
        negatives: true,
      }
    ),
    select(
      'splash',
      t('acid-splash'),
      splash?.severity ?? null,
      CRITICAL_SEVERITIES,
      '',
      (severity) => patch({ splash: severity ? { severity: severity as 'A', modifier: splash?.modifier ?? 0 } : null }),
      true
    ),
    splash &&
      number(
        'splash-mod',
        t('acid-splash-modifier'),
        splash.modifier,
        (modifier) => patch({ splash: { ...splash, modifier: modifier ?? 0 } }),
        { integer: true, negatives: true }
      ),
    select(
      'immersion',
      t('acid-immersion'),
      immersion?.severity ?? null,
      CRITICAL_SEVERITIES,
      '',
      (severity) =>
        patch({
          immersion: severity
            ? { severity, count: immersion?.count ?? 1, everyRounds: immersion?.everyRounds ?? 1 }
            : null,
        }),
      true
    ),
    immersion && [
      number(
        'immersion-count',
        t('acid-immersion-count'),
        immersion.count,
        (count) => patch({ immersion: { ...immersion, count: count ?? 1 } }),
        { integer: true }
      ),
      number(
        'immersion-rounds',
        t('acid-immersion-rounds'),
        immersion.everyRounds,
        (everyRounds) => patch({ immersion: { ...immersion, everyRounds: everyRounds ?? 1 } }),
        { integer: true }
      ),
    ],
    number(
      'ingestion-level',
      t('acid-ingestion-level'),
      ingestion?.level,
      (level) =>
        patch({
          ingestion:
            level === null ? null : { level, penalty: ingestion?.penalty ?? 0, perFailure: ingestion?.perFailure ?? 1 },
        }),
      { integer: true }
    ),
    ingestion && [
      number(
        'ingestion-penalty',
        t('acid-ingestion-penalty'),
        ingestion.penalty,
        (penalty) => patch({ ingestion: { ...ingestion, penalty: penalty ?? 0 } }),
        { integer: true, negatives: true }
      ),
      number(
        'ingestion-per',
        t('acid-ingestion-per-failure'),
        ingestion.perFailure,
        (perFailure) => patch({ ingestion: { ...ingestion, perFailure: perFailure ?? 1 } }),
        { integer: true }
      ),
    ],
  ];
  return <>{cells}</>;
};

const IntoxicantFields: FC<{ intoxicant: ItemIntoxicant; set: Setter }> = ({ intoxicant, set }) => {
  const { t, select, number, text } = useFields();
  const patch = (next: Partial<ItemIntoxicant>) => set({ intoxicant: { ...intoxicant, ...next } });
  const cells: ReactNode[] = [
    number(
      'addiction',
      t('addiction-factor'),
      intoxicant.addictionFactor,
      (addictionFactor) => patch({ addictionFactor }),
      { integer: true, negatives: true }
    ),
    text('form', t('herb-form-key'), intoxicant.form, (form) => patch({ form })),
    select(
      'prep',
      t('herb-prep'),
      intoxicant.prep,
      HERB_PREPS,
      'herb-prep-',
      (prep) => patch({ prep: prep as ItemIntoxicant['prep'] }),
      true
    ),
  ];
  return <>{cells}</>;
};

const GemFields: FC<{ gem: ItemGem; set: Setter }> = ({ gem, set }) => {
  const { t, select, number, text, range } = useFields();
  const patch = (next: Partial<ItemGem>) => set({ gem: { ...gem, ...next } });
  const magic = gem.magic ?? { spells: null, stats: [], skills: null, other: null };
  const setMagic = (next: Partial<NonNullable<ItemGem['magic']>>) => {
    const merged = { ...magic, ...next };
    const empty = !merged.spells && !merged.stats.length && !merged.skills && !merged.other;
    patch({ magic: empty ? null : merged });
  };
  const cells: ReactNode[] = [
    select('grade', t('gem-grade'), gem.grade, GEM_GRADES, 'gem-grade-', (grade) =>
      patch({ grade: (grade ?? 'semi-precious') as ItemGem['grade'] })
    ),
    text('mineral', t('gem-mineral-key'), gem.mineral, (mineral) => patch({ mineral: mineral ?? '' })),
    number('value', t('gem-value-per-carat-gold'), gem.valuePerCarat, (valuePerCarat) =>
      patch({ valuePerCarat: valuePerCarat ?? 0 })
    ),
    number('carats-cm', t('gem-carats-per-cm'), gem.caratsPerCm, (caratsPerCm) => patch({ caratsPerCm })),
    range('hardness', t('gem-hardness'), gem.hardness, (hardness) => patch({ hardness })),
    range('gravity', t('gem-specific-gravity'), gem.specificGravity, (specificGravity) => patch({ specificGravity })),
    text('luster', t('gem-luster-code'), gem.luster, (luster) => patch({ luster })),
    text('spells', t('gem-magic-spells'), magic.spells, (spells) => setMagic({ spells })),
    text('stats', t('gem-magic-stats'), magic.stats.join(', ') || null, (stats) =>
      setMagic({
        stats: (stats ?? '')
          .split(',')
          .map((stat) => stat.trim())
          .filter((stat) => stat),
      })
    ),
    text('skills', t('gem-magic-skills'), magic.skills, (skills) => setMagic({ skills })),
    text('other', t('gem-magic-other'), magic.other, (other) => setMagic({ other })),
  ];
  return <>{cells}</>;
};

const JewelryFields: FC<{ jewelry: ItemJewelry; set: Setter }> = ({ jewelry, set }) => {
  const { t, number, text, flag } = useFields();
  const value = jewelry.value;
  const setValue = (next: Partial<ItemJewelry['value']>) =>
    set({ jewelry: { ...jewelry, value: { ...value, ...next } } });
  const cells: ReactNode[] = [
    number('min', `${t('jewelry-base-value')} (${t('min')})`, value.min, (min) => setValue({ min: min ?? 0 })),
    number('max', `${t('jewelry-base-value')} (${t('max')})`, value.max, (max) => setValue({ max: max ?? 0 })),
    text('dice', t('jewelry-dice'), value.dice, (dice) => setValue({ dice })),
    flag('open', t('jewelry-open-ended'), value.openEnded, (openEnded) => setValue({ openEnded })),
    text('slot', t('jewelry-slot-key'), jewelry.slot, (slot) => set({ jewelry: { ...jewelry, slot } })),
  ];
  return <>{cells}</>;
};

const AnimalFields: FC<{ animal: ItemAnimal; set: Setter }> = ({ animal, set }) => {
  const { t, select, text, flag } = useFields();
  const patch = (next: Partial<ItemAnimal>) => set({ animal: { ...animal, ...next } });
  const cells: ReactNode[] = [
    select('stage', t('animal-stage'), animal.stage, ANIMAL_STAGES, 'animal-stage-', (stage) =>
      patch({ stage: (stage ?? 'adult') as ItemAnimal['stage'] })
    ),
    text('npc', t('animal-creature-id'), animal.npcId, (npcId) => patch({ npcId })),
    flag('trained', t('animal-trained'), animal.trained, (trained) => patch({ trained })),
    flag('domesticated', t('animal-domesticated'), animal.domesticated, (domesticated) => patch({ domesticated })),
  ];
  return <>{cells}</>;
};

const PropertyFields: FC<{ property: ItemProperty; set: Setter }> = ({ property, set }) => {
  const { t, number, text } = useFields();
  const patch = (next: Partial<ItemProperty>) => set({ property: { ...property, ...next } });
  const cells: ReactNode[] = [
    number('rent', t('property-rent-gold'), property.rent, (rent) => patch({ rent })),
    text('size', t('property-size'), property.size, (size) => patch({ size })),
    text('height', t('property-height'), property.height, (height) => patch({ height })),
  ];
  return <>{cells}</>;
};

/** The fields of one Treasure Law block (spec 062), structured for the admin. */
export const TreasureBlockFields: FC<{ block: TreasureBlock; features: ItemFeatures; set: Setter }> = ({
  block,
  features,
  set,
}) => {
  const value: ItemFeatures = { [block]: features[block] ?? emptyTreasureBlock(block)[block] };
  switch (block) {
    case 'herb':
      return <HerbFields herb={value.herb!} set={set} />;
    case 'acid':
      return <AcidFields acid={value.acid!} set={set} />;
    case 'intoxicant':
      return <IntoxicantFields intoxicant={value.intoxicant!} set={set} />;
    case 'gem':
      return <GemFields gem={value.gem!} set={set} />;
    case 'jewelry':
      return <JewelryFields jewelry={value.jewelry!} set={set} />;
    case 'animal':
      return <AnimalFields animal={value.animal!} set={set} />;
    case 'property':
      return <PropertyFields property={value.property!} set={set} />;
  }
};
