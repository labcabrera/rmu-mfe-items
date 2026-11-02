import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { Box, Button, FormControlLabel, Grid, IconButton, Stack, Switch, TextField, Tooltip } from '@mui/material';
import {
  EmptyState,
  EnumPicker,
  MAGIC_BONUS_KINDS,
  MAGIC_ITEM_KINDS,
  MAGIC_ITEM_REALMS,
  MAGIC_SPELL_USES,
  MagicBonusKind,
  MagicItemBonus,
  MagicItemFeature,
  MagicItemKind,
  MagicItemSpell,
  MagicSpellUse,
  NumericInput,
  Panel,
} from '@labcabrera-rmu/rmu-react-shared-lib';

/** Kind of a new magic block: a potion is a potion, the rest is chosen by the game master. */
const defaultKind = (category: string): MagicItemKind => (category === 'potion' ? 'potion' : 'other');

/** A new `features.magic` block (spec 067) with neutral values. */
export const emptyMagicBlock = (category: string): MagicItemFeature => ({
  itemLevel: 1,
  kind: defaultKind(category),
  days: null,
  standardPrice: null,
  basePrice: null,
  attunement: false,
  charges: null,
  realm: null,
  bonuses: [],
  spells: [],
  section: null,
});

const NEW_BONUS: MagicItemBonus = { kind: 'ob', value: 5, target: null, against: null };
const NEW_SPELL: MagicItemSpell = { name: '', level: 1, list: null, use: 'daily', perDay: 1 };

const textOrNull = (value: string): string | null => (value.trim() ? value : null);

/**
 * The magic block of a catalog item (Treasure Law chapter 6, spec 067) for the game master: level, kind, recipe days,
 * prices in gold, attunement, charges, realm, book section, bonuses and spells.
 */
const ItemFormMagic: FC<{ magic: MagicItemFeature; onChange: (magic: MagicItemFeature) => void }> = ({
  magic,
  onChange,
}) => {
  const { t } = useTranslation();
  const patch = (next: Partial<MagicItemFeature>) => onChange({ ...magic, ...next });
  const bonuses = magic.bonuses ?? [];
  const spells = magic.spells ?? [];
  const setBonus = (index: number, next: Partial<MagicItemBonus>) =>
    patch({ bonuses: bonuses.map((bonus, each) => (each === index ? { ...bonus, ...next } : bonus)) });
  const setSpell = (index: number, next: Partial<MagicItemSpell>) =>
    patch({
      spells: spells.map((spell, each) => {
        if (each !== index) return spell;
        const merged = { ...spell, ...next };
        // Only a daily spell has uses per day
        return { ...merged, perDay: merged.use === 'daily' ? (merged.perDay ?? 1) : null };
      }),
    });

  const number = (
    label: string,
    value: number | null | undefined,
    onValue: (value: number | null) => void,
    integer = true
  ) => (
    <Grid size={{ xs: 6, md: 3 }}>
      <NumericInput
        label={label}
        value={value ?? null}
        onChange={onValue}
        integer={integer}
        maxFractionDigits={2}
        allowNegatives={false}
        min={0}
      />
    </Grid>
  );

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <EnumPicker
          label={t('magic-kind')}
          values={MAGIC_ITEM_KINDS}
          labelPrefix="magic-kind-"
          value={magic.kind}
          required
          onChange={(kind) => kind && patch({ kind: kind as MagicItemKind })}
        />
      </Grid>
      {number(t('enchantment-item-level'), magic.itemLevel, (itemLevel) => patch({ itemLevel: itemLevel ?? 0 }))}
      {number(t('days'), magic.days, (days) => patch({ days }))}
      {number(t('magic-standard-price'), magic.standardPrice, (standardPrice) => patch({ standardPrice }), false)}
      {number(t('magic-base-price'), magic.basePrice, (basePrice) => patch({ basePrice }), false)}
      {number(t('magic-charges'), magic.charges, (charges) => patch({ charges: charges || null }))}
      <Grid size={{ xs: 6, md: 3 }}>
        <TextField
          size="small"
          fullWidth
          label={t('book-section')}
          value={magic.section ?? ''}
          onChange={(e) => patch({ section: textOrNull(e.target.value) })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <EnumPicker
          label={t('realm')}
          values={MAGIC_ITEM_REALMS}
          labelPrefix=""
          value={magic.realm}
          allowAll
          allLabel={t('none')}
          onChange={(realm) => patch({ realm: (realm as string | null) || null })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <FormControlLabel
          control={<Switch checked={magic.attunement} onChange={(_, attunement) => patch({ attunement })} />}
          label={t('attunement')}
        />
      </Grid>

      <Grid size={12}>
        <Panel
          variant="outlined"
          dense
          title={t('magic-bonuses')}
          extra={
            <Button size="small" startIcon={<AddIcon />} onClick={() => patch({ bonuses: [...bonuses, NEW_BONUS] })}>
              {t('add')}
            </Button>
          }
        >
          {bonuses.length === 0 && <EmptyState dense title={t('magic-no-bonuses')} />}
          <Stack spacing={1.5}>
            {bonuses.map((bonus, index) => (
              <Stack key={index} direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ alignItems: 'center' }}>
                <Box sx={{ flex: 2, width: '100%' }}>
                  <EnumPicker
                    variant="select"
                    required
                    label={t('magic-bonus')}
                    values={MAGIC_BONUS_KINDS}
                    labelPrefix="magic-bonus-"
                    value={bonus.kind}
                    onChange={(kind) => kind && setBonus(index, { kind: kind as MagicBonusKind })}
                  />
                </Box>
                <Box sx={{ flex: 1, width: '100%' }}>
                  <NumericInput
                    label={t('value')}
                    value={bonus.value}
                    onChange={(value) => setBonus(index, { value: value ?? 0 })}
                    integer={false}
                    maxFractionDigits={2}
                    allowNegatives
                  />
                </Box>
                <TextField
                  size="small"
                  sx={{ flex: 2 }}
                  fullWidth
                  label={t('target')}
                  value={bonus.target ?? ''}
                  onChange={(e) => setBonus(index, { target: textOrNull(e.target.value) })}
                />
                <TextField
                  size="small"
                  sx={{ flex: 2 }}
                  fullWidth
                  label={t('magic-against')}
                  value={bonus.against ?? ''}
                  onChange={(e) => setBonus(index, { against: textOrNull(e.target.value) })}
                />
                <Tooltip title={t('remove')}>
                  <IconButton
                    aria-label={t('remove')}
                    onClick={() => patch({ bonuses: bonuses.filter((_, each) => each !== index) })}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
          </Stack>
        </Panel>
      </Grid>

      <Grid size={12}>
        <Panel
          variant="outlined"
          dense
          title={t('enchantment-spells')}
          extra={
            <Button size="small" startIcon={<AddIcon />} onClick={() => patch({ spells: [...spells, NEW_SPELL] })}>
              {t('add')}
            </Button>
          }
        >
          {spells.length === 0 && <EmptyState dense title={t('magic-no-spells')} />}
          <Stack spacing={1.5}>
            {spells.map((spell, index) => (
              <Stack key={index} direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ alignItems: 'center' }}>
                <TextField
                  size="small"
                  sx={{ flex: 3 }}
                  fullWidth
                  label={t('spell')}
                  value={spell.name}
                  error={!spell.name}
                  onChange={(e) => setSpell(index, { name: e.target.value })}
                />
                <Box sx={{ flex: 1, width: '100%' }}>
                  <NumericInput
                    label={t('level')}
                    value={spell.level}
                    onChange={(level) => setSpell(index, { level: level ?? 0 })}
                    integer
                    allowNegatives={false}
                    min={0}
                  />
                </Box>
                <TextField
                  size="small"
                  sx={{ flex: 2 }}
                  fullWidth
                  label={t('spell-list')}
                  value={spell.list ?? ''}
                  onChange={(e) => setSpell(index, { list: textOrNull(e.target.value) })}
                />
                <Box sx={{ flex: 2, width: '100%' }}>
                  <EnumPicker
                    variant="select"
                    required
                    label={t('use')}
                    values={MAGIC_SPELL_USES}
                    labelPrefix="magic-spell-use-"
                    value={spell.use}
                    onChange={(use) => use && setSpell(index, { use: use as MagicSpellUse })}
                  />
                </Box>
                {spell.use === 'daily' && (
                  <Box sx={{ flex: 1, width: '100%' }}>
                    <NumericInput
                      label={t('magic-per-day')}
                      value={spell.perDay ?? null}
                      onChange={(perDay) => setSpell(index, { perDay: perDay || 1 })}
                      integer
                      allowNegatives={false}
                      min={1}
                    />
                  </Box>
                )}
                <Tooltip title={t('remove')}>
                  <IconButton
                    aria-label={t('remove')}
                    onClick={() => patch({ spells: spells.filter((_, each) => each !== index) })}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
          </Stack>
        </Panel>
      </Grid>
    </>
  );
};

export default ItemFormMagic;
