import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid } from '@mui/material';
import { CategorySeparator } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { CreateItemDto } from '../../api/item.dto';
import { fetchPagedSkills } from '../../api/skill';
import { Skill } from '../../api/skill.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectSkill from '../../shared/selects/SelectSkill';
import ItemCreationWeaponModes from './ItemCreationWeaponModes';

const ItemCreationWeaponAttributes: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  const { showError } = useError();

  const [combatSkills, setCombatSkills] = React.useState<Skill[]>([]);

  useEffect(() => {
    fetchPagedSkills('categoryId==combat-training', 0, 100)
      .then((response) => setCombatSkills(response.content))
      .catch((err: Error) => showError(err.message));
  }, [showError]);

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CategorySeparator text={t('Weapon')} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectSkill
          name="skill"
          label={t('Skill')}
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
          label={t('Fumble')}
        />
      </Grid>
      <Grid size={12}>
        <ItemCreationWeaponModes formData={formData} setFormData={setFormData} />
      </Grid>
    </Grid>
  );
};

export default ItemCreationWeaponAttributes;
