import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { AddButton, fetchItems, Item, RefreshButton, RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const ItemListActions: FC<{ setItems: Dispatch<SetStateAction<Item[]>> }> = ({ setItems }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('home'), link: '/' },
    { name: t('items'), link: '/items' },
  ];

  const onAddItemClick = () => {
    navigate('/items/create');
  };

  const onRefreshButtonClick = () => {
    fetchItems('', 0, 24, auth)
      .then((response) => setItems(response.content))
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
