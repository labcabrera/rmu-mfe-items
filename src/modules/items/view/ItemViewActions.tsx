import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteItem } from '../../api/item';
import { fetchItem } from '../../api/item';
import { Item } from '../../api/item.dto';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import RefreshButton from '../../shared/buttons/RefreshButton';
import DeleteDialog from '../../shared/dialogs/DeleteDialog';

const ItemViewActions: FC<{
  item: Item;
  setItem: Dispatch<SetStateAction<Item | undefined>>;
}> = ({ item, setItem }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onDeleteItem = () => {
    deleteItem(item.id)
      .then(() => navigate('/items'))
      .catch((err) => showError(err.message));
  };

  const onRefreshButtonClick = () => {
    fetchItem(item.id)
      .then((response) => setItem(response))
      .catch((err) => showError(err.message));
  };

  const onEditButtonClick = () => {
    navigate(`/items/edit/${item.id}`, { state: { item } });
  };

  const onDeleteButtonClick = () => {
    setDeleteDialogOpen(true);
  };

  const onCloseDialogClick = () => {
    setDeleteDialogOpen(false);
  };

  const onDeleteDialogClick = () => {
    onDeleteItem();
    setDeleteDialogOpen(false);
  };

  if (!item) return <p>Loading item...</p>;

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" underline="hover" href="/">
              {t('home')}
            </Link>
            <Link component={RouterLink} color="primary" underline="hover" to="/items">
              {t('items')}
            </Link>
            <span>{item.id}</span>
          </Breadcrumbs>
        </Box>
        <Stack direction="row" spacing={1}>
          <RefreshButton onClick={() => onRefreshButtonClick()} />
          <EditButton onClick={() => onEditButtonClick()} />
          <DeleteButton onClick={() => onDeleteButtonClick()} />
        </Stack>
      </Stack>
      <DeleteDialog
        open={deleteDialogOpen}
        message={`Are you sure you want to delete ${item.id} item? This action cannot be undone.`}
        onDelete={() => onDeleteDialogClick()}
        onClose={() => onCloseDialogClick()}
      />
    </>
  );
};

export default ItemViewActions;
