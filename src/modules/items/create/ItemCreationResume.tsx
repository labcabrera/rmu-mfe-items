import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { NamedEntity } from '../../api/common.dto';
import { CreateItemDto } from '../../api/item.dto';
import SelectItemCategory from '../../shared/selects/SelectItemCategory';
import SelectRealm from '../../shared/selects/SelectRealm';

const ItemCreationResume: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
  realms: NamedEntity[];
}> = ({ formData, setFormData, realms }) => {
  const onChangeCategory = (category: string | null) => {
    setFormData({ ...formData, category: category || '' });
  };

  return (
    <Grid container spacing={2} mt={2}>
      TODO
      <Grid size={12}>
        <TextField
          label={t('item-identifier')}
          variant="standard"
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
        <SelectItemCategory
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
          variant="standard"
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
