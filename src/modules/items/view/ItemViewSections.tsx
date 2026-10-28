import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Chip, Grid, Link, Stack, Typography } from '@mui/material';
import {
  formatBonus,
  Item,
  itemCategoryLabel,
  ItemFeatureChips,
  itemFeatureLines,
  ItemFeatureTranslate,
  KeyValuePanel,
  KeyValueRow,
  MoneyDisplay,
  Panel,
  Realm,
  WeaponMode,
} from '@labcabrera-rmu/rmu-react-shared-lib';

/** Sections of the item view (spec 046, decision 14), in the order of their tabs. */
export const itemSectionIds = ['summary', 'combat', 'features', 'modifiers', 'economy'] as const;
export type ItemSectionId = (typeof itemSectionIds)[number];

const present = (value: number | null | undefined): value is number => value !== null && value !== undefined;

/** What the feature chips read: the general equipment data and the OB modifier of an improvised weapon. */
const featureSource = (item: Item) => ({ features: item.features, weapon: item.weapon });

/** The sections with content for this item: Combat, Features, Modifiers and Economy only when they have data. */
export const visibleItemSections = (item: Item | undefined, t: ItemFeatureTranslate): ItemSectionId[] =>
  itemSectionIds.filter((id) => {
    if (!item) return id === 'summary';
    switch (id) {
      case 'combat':
        return !!(item.weapon || item.armor || item.shield);
      case 'features':
        return itemFeatureLines(featureSource(item), t).length > 0;
      case 'modifiers':
        return (item.modifiers?.length ?? 0) > 0;
      case 'economy':
        return !!item.info.cost || present(item.info.productionHours) || present(item.info.strength);
      default:
        return true;
    }
  });

/** The skill of a weapon and, when it has one, its specialization (`melee-weapon@blade`). */
export const weaponSkillParts = (skillId: string): { skill: string; specialization?: string } => {
  const [skill, specialization] = skillId.split('@');
  return { skill, specialization: specialization || undefined };
};

const Signed = ({ value }: { value: number }) => (
  <Box component="span" sx={{ color: value > 0 ? 'stat.positive' : value < 0 ? 'stat.negative' : undefined }}>
    {formatBonus(value)}
  </Box>
);

const Money = ({ gold }: { gold: number | null | undefined }) =>
  present(gold) && gold > 0 ? <MoneyDisplay gold={gold} /> : '-';

export function ItemSummarySection({ item, realm }: { item: Item; realm?: Realm }) {
  const { t } = useTranslation();
  const { info } = item;
  const rows: KeyValueRow[] = [
    { label: t('category'), value: itemCategoryLabel(item.category, t) },
    ...(item.realmId
      ? [
          {
            label: t('realm'),
            value: (
              <Link component={RouterLink} to={`/core/realms/view/${item.realmId}`}>
                {realm ? t(realm.name) : item.realmId}
              </Link>
            ),
          },
        ]
      : []),
    { label: t('rarity'), value: t(info.rarity) },
    { label: t('unique'), value: t(info.unique ? 'yes' : 'no') },
    { label: t('stackable'), value: t(info.stackable ? 'yes' : 'no') },
    ...(info.lotSize ? [{ label: t('lot-size'), value: info.lotSize }] : []),
    { label: t('weight'), value: present(info.weight) ? `${info.weight} ${t('lbs')}` : '-' },
    { label: t('length'), value: present(info.length) ? `${info.length}'` : '-' },
  ];
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <KeyValuePanel title={t('information')} rows={rows} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Panel title={t('description')}>
          <Typography
            variant="body2"
            color={item.description ? undefined : 'text.secondary'}
            sx={{ whiteSpace: 'pre-line' }}
          >
            {item.description ? t(item.description, { defaultValue: item.description }) : t('no-description')}
          </Typography>
        </Panel>
      </Grid>
    </Grid>
  );
}

const WeaponModePanel = ({ mode }: { mode: WeaponMode }) => {
  const { t } = useTranslation();
  const rows: KeyValueRow[] = [
    { label: t('attack-types'), value: mode.attackTypes.map((type) => t(type)).join(', ') || '-' },
    { label: t('attack-table'), value: t(mode.attackTable) },
    { label: t('fumble-table'), value: t(mode.fumbleTable) },
    { label: t('size-adjustment'), value: <Signed value={mode.sizeAdjustment ?? 0} /> },
    ...(present(mode.obModifier) ? [{ label: t('ob-modifier'), value: <Signed value={mode.obModifier} /> }] : []),
    ...(mode.ranges ?? []).map((range) => ({
      label: `${range.from}' - ${range.to}'`,
      hint: t('ranges'),
      value: <Signed value={range.bonus} />,
    })),
  ];
  return <KeyValuePanel title={`${t('weapon')} · ${t(mode.type)}`} rows={rows} />;
};

export function ItemCombatSection({ item }: { item: Item }) {
  const { t } = useTranslation();
  const panels: { key: string; node: ReactNode }[] = [];
  if (item.weapon) {
    const { skill, specialization } = weaponSkillParts(item.weapon.skillId);
    const rows: KeyValueRow[] = [
      { label: t('skill'), value: t(skill) },
      // Only a real specialization: a skill without one was shown twice (spec 046)
      ...(specialization ? [{ label: t('specialization'), value: t(specialization) }] : []),
      { label: t('fumble'), value: item.weapon.fumble },
      ...(item.weapon.tags?.length
        ? [
            {
              label: t('weapon-tags'),
              value: item.weapon.tags.map((tag) => t(`weapon-tag-${tag}`, { defaultValue: tag })).join(', '),
            },
          ]
        : []),
    ];
    panels.push({ key: 'weapon', node: <KeyValuePanel title={t('weapon')} rows={rows} /> });
    item.weapon.modes.forEach((mode, index) =>
      panels.push({ key: `mode-${index}`, node: <WeaponModePanel mode={mode} /> })
    );
  }
  if (item.armor) {
    const { armor } = item;
    const rows: KeyValueRow[] = [
      { label: t('at'), value: armor.at },
      { label: t('slot'), value: t(armor.slot) },
      { label: t('encumbrance'), value: armor.enc ? `${armor.enc}%` : '-' },
      { label: t('maneuver-penalty'), value: <Signed value={armor.maneuverPenalty} /> },
      { label: t('perception-penalty'), value: <Signed value={armor.perceptionPenalty} /> },
      { label: t('ranged-penalty'), value: <Signed value={armor.rangedPenalty} /> },
      { label: t('base-difficulty'), value: armor.baseDifficulty ? t(`difficulty-${armor.baseDifficulty}`) : '-' },
      ...(armor.class ? [{ label: t('armor-class'), value: t(`item-armor-class-${armor.class}`) }] : []),
      ...((armor.coverage?.length ?? 0) > 1
        ? [{ label: t('item-feature-full-suit'), value: armor.coverage!.map((slot) => t(slot)).join(', ') }]
        : []),
    ];
    panels.push({ key: 'armor', node: <KeyValuePanel title={t('armor')} rows={rows} /> });
  }
  if (item.shield) {
    const rows: KeyValueRow[] = [
      // The defensive bonus of the shield (it was labelled AT)
      { label: t('db'), value: <Signed value={item.shield.db} /> },
      { label: t('block-count'), value: item.shield.blockCount },
    ];
    panels.push({ key: 'shield', node: <KeyValuePanel title={t('shield')} rows={rows} /> });
  }
  return (
    <Grid container spacing={2}>
      {panels.map((panel) => (
        <Grid key={panel.key} size={{ xs: 12, md: 6 }}>
          {panel.node}
        </Grid>
      ))}
    </Grid>
  );
}

export function ItemFeaturesSection({ item }: { item: Item }) {
  const { t } = useTranslation();
  return (
    <Panel title={t('item-features')}>
      <ItemFeatureChips item={featureSource(item)} />
    </Panel>
  );
}

/**
 * Modifiers of a catalog item (bonus, skill bonus, item damage, material, slayer). They are not the modifiers of an
 * owned item (breakage, quality) that ItemModifierChips shows, so they get chips of their own.
 */
export function ItemModifiersSection({ item }: { item: Item }) {
  const { t } = useTranslation();
  return (
    <Panel title={t('modifiers')}>
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
        {(item.modifiers ?? []).map((modifier) => {
          const value = modifier.value;
          const target = [modifier.modifier, modifier.specialization]
            .filter((part): part is string => !!part)
            .map((part) => t(part))
            .join(' · ');
          const label = [t(modifier.type), present(value) ? formatBonus(value) : '', target].filter(Boolean).join(' ');
          return (
            <Chip
              key={modifier.id}
              label={label}
              color={present(value) && value > 0 ? 'success' : present(value) && value < 0 ? 'warning' : 'default'}
              variant="outlined"
            />
          );
        })}
      </Stack>
    </Panel>
  );
}

export function ItemEconomySection({ item }: { item: Item }) {
  const { t } = useTranslation();
  const { info } = item;
  const rows: KeyValueRow[] = [
    { label: t('cost-min'), value: <Money gold={info.cost?.min} /> },
    { label: t('cost-average'), value: <Money gold={info.cost?.average} /> },
    { label: t('cost-max'), value: <Money gold={info.cost?.max} /> },
    { label: t('production-hours'), value: present(info.productionHours) ? info.productionHours : '-' },
    { label: t('strength'), value: present(info.strength) ? info.strength : '-' },
  ];
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <KeyValuePanel title={t('economy')} rows={rows} />
      </Grid>
    </Grid>
  );
}
