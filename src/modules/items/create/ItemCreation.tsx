import React, { FC, useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { Item, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import ItemForm from '../shared/ItemForm';
import ItemCreationActions from './ItemCreationActions';

const ItemCreation: FC = () => {
  const [formData, setFormData] = useState<Item>({ info: {} } as Item);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: Item) => {
    if (!formData.id) return false;
    return true;
  };

  useEffect(() => {
    if (formData) {
      setIsValid(validateForm(formData));
    }
  }, [formData]);

  if (!formData) return <div>Loading...</div>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
        </Grid>
        <Grid size={gridSizeMain}>
          <ItemCreationActions formData={formData} isValid={isValid} />
          <Paper sx={{ p: 2 }}>
            <ItemForm formData={formData} setFormData={setFormData} />
          </Paper>
          <TechnicalInfo>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemCreation;
