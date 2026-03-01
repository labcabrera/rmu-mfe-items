import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { UpdateItemDto } from '../../api/item.dto';

const ItemEditResume: FC<{
  formData: UpdateItemDto;
  setFormData: Dispatch<SetStateAction<UpdateItemDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2} mt={3}>
      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          variant="outlined"
          fullWidth
          multiline
          rows={10}
        />
      </Grid>
    </Grid>
  );
};

export default ItemEditResume;
