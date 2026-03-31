import React, { Dispatch, FC, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddButton, RefreshButton, RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchItems } from '../../api/item';
import { Item } from '../../api/item.dto';

const ItemListActions: FC<{ setItems: Dispatch<SetStateAction<Item[]>> }> = ({ setItems }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [{ name: t('Items'), link: '/items' }];

  const onAddItemClick = () => {
    navigate('/items/create');
  };

  const onRefreshButtonClick = () => {
    fetchItems('', 0, 24)
      .then((response) => setItems(response))
      .catch((err) => showError(err.message));
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={() => onRefreshButtonClick()} />
      <AddButton onClick={() => onAddItemClick()} />
    </RmuBreadcrumbs>
  );
};

export default ItemListActions;
