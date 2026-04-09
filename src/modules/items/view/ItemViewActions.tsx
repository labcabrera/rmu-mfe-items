import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DeleteButton,
  DeleteDialog,
  deleteItem,
  EditButton,
  fetchItem,
  Item,
  RefreshButton,
  RmuBreadcrumbs,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';

const ItemViewActions: FC<{
  item: Item;
  setItem: Dispatch<SetStateAction<Item | undefined>>;
}> = ({ item, setItem }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const breadcrumbs = [{ name: t('Items'), link: '/items' }, { name: t('Edit') }];

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
    deleteItem(item.id)
      .then(() => {
        setDeleteDialogOpen(false);
        navigate('/items', { replace: true });
      })
      .catch((err) => showError(err.message));
  };

  if (!item) return <p>Loading item...</p>;

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs}>
        <RefreshButton onClick={() => onRefreshButtonClick()} />
        <EditButton onClick={() => onEditButtonClick()} />
        <DeleteButton onClick={() => onDeleteButtonClick()} />
      </RmuBreadcrumbs>
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
