import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid, Box, Typography, TextField, Stack } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { CreateItemDto } from '../../api/item.dto';
import { fetchPagedSkills } from '../../api/skill';
import { Skill } from '../../api/skill.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectSkill from '../../shared/selects/SelectSkill';

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
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t('weapon')}
        </Typography>
      </Grid>

      <Grid size={12}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Box width={320}>
            <SelectSkill
              name="skill"
              label={t('skill')}
              value={formData.weapon!.skillId || ''}
              onChange={(skill) =>
                setFormData({ ...formData, weapon: { ...formData.weapon!, skillId: skill?.id || '' } })
              }
              skills={combatSkills}
            />
          </Box>

          <Box width={160}>
            <NumericInput
              value={formData.weapon!.fumble ?? null}
              onChange={(fumble) => setFormData({ ...formData, weapon: { ...formData.weapon!, fumble: fumble ?? 0 } })}
              integer={true}
              min={0}
              label={t('fumble')}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ItemCreationWeaponAttributes;
