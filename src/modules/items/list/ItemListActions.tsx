import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AddButton, RefreshButton, RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemListActions({ onRefresh }: { onRefresh: () => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const breadcrumbs = [
    { name: t('home'), link: '/' },
    { name: t('items'), link: '/items' },
  ];

  const onAddItemClick = () => {
    navigate('/items/create');
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={() => onRefresh()} />
      <AddButton onClick={() => onAddItemClick()} />
    </RmuBreadcrumbs>
  );
}
