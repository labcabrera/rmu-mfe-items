import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { NamedEntity } from '../../api/common.dto';
import { CreateItemDto } from '../../api/item.dto';
import SelectArmorSlot from '../../shared/selects/SelectItemCategory';
import SelectRealm from '../../shared/selects/SelectRealm';

const ItemCreationResume: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
  realms: NamedEntity[];
}> = ({ formData, setFormData, realms }) => {
  const onChangeCategory = (category: string | null) => {
    const nextCategory = category || '';
    const next: Partial<typeof formData> = { category: nextCategory };
    const info = { cost: { min: 0, average: 0, max: 0 } };
    if (nextCategory === 'weapon') {
      next.weapon = { skillId: '', fumble: 0, modes: [] };
      next.armor = undefined;
      next.shield = undefined;
    } else if (nextCategory === 'armor') {
      next.armor = { slot: undefined, at: 0, enc: 0, maneuver: 0, rangedPenalty: 0, perception: 0, baseDifficulty: '' };
      next.weapon = undefined;
      next.shield = undefined;
    } else if (nextCategory === 'shield') {
      next.shield = { attacks: 0 };
      next.weapon = undefined;
      next.armor = undefined;
    } else {
      next.weapon = undefined;
      next.armor = undefined;
      next.shield = undefined;
    }
    setFormData({ ...formData, ...next, info });
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <TextField
          label={t('item-identifier')}
          variant="outlined"
          name="item-identifier"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          fullWidth
          error={!formData.id || formData.id.trim() === ''}
          helperText={!formData.id || formData.id.trim() === '' ? t('required-item-identifier') : ''}
        />
      </Grid>
      <Grid size={12}>
        <SelectRealm
          label={t('realm')}
          realms={realms}
          value={formData.realmId}
          required
          onChange={(realm) => setFormData({ ...formData, realmId: realm ? realm.id : '' })}
        />
      </Grid>
      <Grid size={12}>
        <SelectArmorSlot
          label={t('category')}
          name="category"
          value={formData.category}
          required
          onChange={onChangeCategory}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          multiline
          rows={10}
        />
      </Grid>
    </Grid>
  );
};

export default ItemCreationResume;
