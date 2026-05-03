/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid } from '@mui/material';
import {
  CategorySeparator,
  fetchSkills,
  fetchEnumerations,
  RmuKeyLabelSelect,
  KeyLabel,
  Item,
  NumericInput,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import ItemFormWeaponAttacks from './ItemFormWeaponAttacks';

const gridSize = { xs: 12, md: 3 };

const ItemCreationWeaponAttributes: FC<{
  formData: Item;
  setFormData: Dispatch<SetStateAction<Item>>;
}> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [skills, setSkills] = useState<KeyLabel[]>();

  const mapSkills = async () => {
    try {
      const meleeResp = await fetchEnumerations('category==melee-weapon-type', 0, 100, auth);
      const rangedResp = await fetchEnumerations('category==ranged-weapon-type', 0, 100, auth);
      const meleeSpecs = meleeResp?.content || [];
      const rangedSpecs = rangedResp?.content || [];
      const skillsResp = await fetchSkills('categoryId==combat-training', 0, 100, auth);
      const list = skillsResp?.content || [];
      const values: KeyLabel[] = [];
      list.forEach((e) => {
        const isMelee = e.specialization === 'melee-weapon-type';
        const isRanged = e.specialization === 'ranged-weapon-type';
        const specs = isMelee ? meleeSpecs : isRanged ? rangedSpecs : undefined;
        if (specs) {
          specs.forEach((s) => values.push({ key: `${e.id}@${s.key}`, label: `${t(e.id)} - ${t(s.key)}` }));
        } else {
          values.push({ key: e.id, label: e.id });
        }
      });
      setSkills(values);
    } catch (err: any) {
      showError(err.message);
    }
  };

  useEffect(() => {
    mapSkills();
  }, []);

  if (!skills) return <p>Loading...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CategorySeparator text={t('weapon')} />
      </Grid>
      <Grid size={gridSize}>
        <RmuKeyLabelSelect
          value={formData.weapon?.skillId || ''}
          options={skills}
          label={t('skill')}
          i18n={false}
          onChange={(e) => {
            setFormData({ ...formData, weapon: { ...formData.weapon!, skillId: e } });
          }}
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
      <Grid size={12}>
        <ItemFormWeaponAttacks formData={formData} setFormData={setFormData} />
      </Grid>
    </Grid>
  );
};

export default ItemCreationWeaponAttributes;
