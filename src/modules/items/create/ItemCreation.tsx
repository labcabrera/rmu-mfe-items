import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { CreateItemDto } from '../../api/item.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import ItemCreationActions from './ItemCreationActions';
import ItemCreationAttributes from './ItemCreationAttributes';

const ItemCreation: FC = () => {
  const [formData, setFormData] = useState<CreateItemDto>({ info: {} } as CreateItemDto);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: CreateItemDto) => {
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
      <ItemCreationActions formData={formData} isValid={isValid} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
        </Grid>
        <Grid size={gridSizeMain}>
          <ItemCreationAttributes formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemCreation;
