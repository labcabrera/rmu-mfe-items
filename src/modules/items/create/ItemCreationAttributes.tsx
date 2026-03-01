import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { CreateItemDto } from '../../api/item.dto';
import ItemCreationInfo from './ItemCreationInfo';

const ItemCreationAttributes: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <ItemCreationInfo formData={formData} setFormData={setFormData} />
      </Grid>
    </Grid>
  );
};

export default ItemCreationAttributes;
