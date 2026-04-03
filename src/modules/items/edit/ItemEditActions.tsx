import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateItem } from '../../api/item';
import { Item } from '../../api/item.dto';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const ItemEditActions: FC<{
  item: Item;
  formData: Item;
}> = ({ item, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [{ name: t('Items'), link: '/items' }, { name: t('Edit') }];

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
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={onCancelButtonClick} />
      <SaveButton onClick={onSaveButtonClick} />
    </RmuBreadcrumbs>
  );
};

export default ItemEditActions;
