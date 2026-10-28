/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Autocomplete, Chip, Grid, TextField } from '@mui/material';
import {
  CategorySeparator,
  EntityOption,
  EntityPicker,
  fetchEnumerations,
  fetchSkills,
  Item,
  NumericInput,
  useNotify,
  weaponSkillImage,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemFormWeaponAttacks from './ItemFormWeaponAttacks';

const gridSize = { xs: 12, md: 3 };

/** Tags the fighting styles ask for when the type and the skill can't tell (spec 032). */
const WEAPON_TAGS = ['fencing', 'quarterstaff', 'axe', 'hooked', 'whip', 'improvised', 'net'];
const TAG_PATTERN = /^[a-z0-9-]{1,50}$/;

const ItemCreationWeaponAttributes: FC<{
  formData: Item;
  setFormData: (item: Item) => void;
}> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [skills, setSkills] = useState<EntityOption[]>();

  const mapSkills = async () => {
    try {
      const meleeResp = await fetchEnumerations('category==melee-weapon-type', 0, 100, auth);
      const rangedResp = await fetchEnumerations('category==ranged-weapon-type', 0, 100, auth);
      const meleeSpecs = meleeResp?.content || [];
      const rangedSpecs = rangedResp?.content || [];
      const skillsResp = await fetchSkills('categoryId==combat-training', 0, 100, auth);
      const list = skillsResp?.content || [];
      const values: EntityOption[] = [];
      list.forEach((e) => {
        const isMelee = e.specialization === 'melee-weapon-type';
        const isRanged = e.specialization === 'ranged-weapon-type';
        const specs = isMelee ? meleeSpecs : isRanged ? rangedSpecs : undefined;
        if (specs) {
          specs.forEach((s) => {
            const id = `${e.id}@${s.key}`;
            values.push({ id, label: t(s.key), group: t(e.id), imageUrl: weaponSkillImage(id) });
          });
        } else {
          values.push({ id: e.id, label: t(e.id), group: t(e.id), imageUrl: weaponSkillImage(e.id) });
        }
      });
      setSkills(values);
    } catch (err: any) {
      notify.error(err);
    }
  };

  useEffect(() => {
    mapSkills();
  }, []);

  if (!skills) return <p>{t('loading')}</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CategorySeparator text={t('weapon')} />
      </Grid>
      <Grid size={gridSize}>
        <EntityPicker
          variant="select"
          kind="item"
          required
          value={formData.weapon?.skillId || null}
          options={skills}
          label={t('skill')}
          onChange={(skillId) => setFormData({ ...formData, weapon: { ...formData.weapon!, skillId: skillId ?? '' } })}
        />
      </Grid>
      <Grid size={gridSize}>
        <NumericInput
          value={formData.weapon!.fumble ?? null}
          onChange={(fumble) => setFormData({ ...formData, weapon: { ...formData.weapon!, fumble: fumble ?? 0 } })}
          integer={true}
          min={0}
          label={t('fumble')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Autocomplete
          multiple
          freeSolo
          size="small"
          options={WEAPON_TAGS}
          value={formData.weapon?.tags || []}
          getOptionLabel={(tag) => t(`weapon-tag-${tag}`, { defaultValue: tag })}
          onChange={(_, tags) => {
            const valid = [
              ...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter((tag) => TAG_PATTERN.test(tag))),
            ];
            setFormData({ ...formData, weapon: { ...formData.weapon!, tags: valid } });
          }}
          renderValue={(tags, getItemProps) =>
            tags.map((tag, index) => {
              const { key, ...itemProps } = getItemProps({ index });
              return (
                <Chip key={key} size="small" label={t(`weapon-tag-${tag}`, { defaultValue: tag })} {...itemProps} />
              );
            })
          }
          renderInput={(params) => (
            <TextField {...params} variant="standard" label={t('weapon-tags')} helperText={t('weapon-tags-help')} />
          )}
        />
      </Grid>
      <Grid size={12}>
        <ItemFormWeaponAttacks formData={formData} setFormData={setFormData} />
      </Grid>
    </Grid>
  );
};

export default ItemCreationWeaponAttributes;
