import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateItemDto } from '../../api/item.dto';

const ItemCreationResume: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2} mt={2}>
      TODO
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
