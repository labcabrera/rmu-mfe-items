import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { NamedEntity } from '../../api/common.dto';
import { CreateItemDto } from '../../api/item.dto';
import { fetchRealms } from '../../api/realm';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import ItemCreationActions from './ItemCreationActions';
import ItemCreationArmorAttributes from './ItemCreationArmorAttributes';
import ItemCreationAttributes from './ItemCreationAttributes';
import ItemCreationResume from './ItemCreationResume';
import ItemCreationWeaponAttributes from './ItemCreationWeaponAttributes';

const ItemCreation: FC = () => {
  const { showError } = useError();
  const [realms, setRealms] = useState<NamedEntity[]>([]);
  const [formData, setFormData] = useState<CreateItemDto>({
    info: { cost: { min: 0, average: 0, max: 0 } },
  } as CreateItemDto);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: CreateItemDto) => {
    if (!formData.id) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm(formData));
    fetchRealms('', 0, 100)
      .then((realms) => setRealms(realms))
      .catch((err: Error) => showError(err.message));
  }, [formData, showError]);

  if (!formData) return <div>Loading...</div>;

  return (
    <>
      <ItemCreationActions formData={formData} isValid={isValid} />
      <Grid container spacing={2}>
        <Grid size={2}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
          <ItemCreationResume formData={formData} setFormData={setFormData} realms={realms} />
        </Grid>
        <Grid size={8}>
          <ItemCreationArmorAttributes formData={formData} setFormData={setFormData} />
          {formData.weapon && <ItemCreationWeaponAttributes formData={formData} setFormData={setFormData} />}
          <ItemCreationAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default ItemCreation;
