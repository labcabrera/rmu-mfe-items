/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid } from '@mui/material';
import { CategorySeparator, CreateItemDto, fetchSkills, Skill } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectSkill from '../../shared/selects/SelectSkill';
import ItemFormWeaponAttacks from './ItemFormWeaponAttacks';

const ItemCreationWeaponAttributes: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();

  const [combatSkills, setCombatSkills] = React.useState<Skill[]>([]);

  useEffect(() => {
    fetchSkills('categoryId==combat-training', 0, 100, auth)
      .then((response) => setCombatSkills(response.content))
      .catch((err) => showError(err.message));
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CategorySeparator text={t('weapon')} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectSkill
          name="skill"
          label={t('skill')}
          value={formData.weapon!.skillId || ''}
          onChange={(skill) => setFormData({ ...formData, weapon: { ...formData.weapon!, skillId: skill?.id || '' } })}
          skills={combatSkills}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
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
