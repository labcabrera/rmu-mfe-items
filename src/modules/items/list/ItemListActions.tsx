import React, { Dispatch, FC, SetStateAction } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchItems } from '../../api/item';
import { Item } from '../../api/item.dto';
import AddButton from '../../shared/buttons/AddButton';
import RefreshButton from '../../shared/buttons/RefreshButton';

const ItemListActions: FC<{ setItems: Dispatch<SetStateAction<Item[]>> }> = ({ setItems }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const onAddItemClick = () => {
    navigate('/items/create');
  };

  const onRefreshButtonClick = () => {
    fetchItems('', 0, 24)
      .then((response) => setItems(response))
      .catch((err) => showError(err.message));
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" underline="hover" href="/">
            {t('home')}
          </Link>
          <Link component={RouterLink} color="primary" underline="hover" to="/items">
            {t('items')}
          </Link>
          <span>{t('list')}</span>
        </Breadcrumbs>
      </Box>
      <Stack spacing={1} direction="row">
        <RefreshButton onClick={() => onRefreshButtonClick()} />
        <AddButton onClick={() => onAddItemClick()} />
      </Stack>
    </Stack>
  );
};

export default ItemListActions;
