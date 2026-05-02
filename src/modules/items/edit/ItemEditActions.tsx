import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Item, RmuBreadcrumbs, updateItem, UpdateItemDto } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const ItemEditActions: FC<{
  item: Item;
  formData: Item;
}> = ({ item, formData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [{ name: t('Items'), link: '/items' }, { name: t('Edit') }];

  const onSaveButtonClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { id, ...rest } = formData;
    const dto = rest as unknown as UpdateItemDto;
    updateItem(item.id, dto, auth)
      .then((data) => navigate(`/items/view/${item.id}`, { state: { item: data } }))
      .catch((err) => showError(err.message));
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
