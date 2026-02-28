import React, { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateItem } from '../../api/item';
import { Item, UpdateItemDto } from '../../api/item.dto';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const ItemEditActions: FC<{
  item: Item;
  formData: UpdateItemDto;
}> = ({ item, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const onSaveButtonClick = async () => {
    updateItem(item.id, formData)
      .then((data) => {
        navigate(`/items/view/${item.id}`, { state: { item: data } });
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const onCancelButtonClick = () => {
    navigate(`/items/view/${item.id}`, { state: { item } });
  };

  if (!item) return <p>Loading...</p>;

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="primary" underline="hover" href="/">
          {t('home')}
        </Link>
        <Link component={RouterLink} color="primary" underline="hover" to="/items">
          {t('items')}
        </Link>
        <Link color="primary" underline="hover" component={RouterLink} to={`/items/view/${item.id}`} state={{ item }}>
          {item.id}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{t('edit')}</Typography>
      </Breadcrumbs>
      <Stack direction="row" spacing={1}>
        <CancelButton onClick={onCancelButtonClick} />
        <SaveButton onClick={onSaveButtonClick} />
      </Stack>
    </Stack>
  );
};

export default ItemEditActions;
