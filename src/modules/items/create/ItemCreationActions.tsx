import React, { FC } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Stack, Link } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createItem } from '../../api/item';
import { CreateItemDto } from '../../api/item.dto';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const ItemCreationActions: FC<{
  formData: CreateItemDto;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const onSaveClick = async () => {
    createItem(formData)
      .then((item) => navigate(`/items/view/${item.id}`))
      .catch((err: Error) => showError(err.message));
  };

  const onBackClick = () => {
    navigate(`/items`);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" underline="hover" href="/">
            {t('home')}
          </Link>
          <Link component={RouterLink} to="/items" color="primary" underline="hover">
            {t('items')}
          </Link>
          <span>{t('create')}</span>
        </Breadcrumbs>
      </Box>
      <Stack spacing={1} direction="row">
        <CancelButton onClick={onBackClick} />
        <SaveButton onClick={onSaveClick} disabled={!isValid} />
      </Stack>
    </Stack>
  );
};

export default ItemCreationActions;
