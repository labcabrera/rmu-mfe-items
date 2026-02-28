import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { CreateItemDto } from '../../api/item.dto';

const ItemCreationAttributes: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2}>
      TODO
    </Grid>
  );
};

export default ItemCreationAttributes;
