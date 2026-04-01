import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CancelButton, RmuBreadcrumbs, SaveButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createItem } from '../../api/item';
import { CreateItemDto } from '../../api/item.dto';

const ItemCreationActions: FC<{
  formData: CreateItemDto;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [{ name: t('Items'), link: '/items' }, { name: t('Creation') }];

  const onSaveClick = async () => {
    createItem(formData)
      .then((item) => navigate(`/items/view/${item.id}`))
      .catch((err: Error) => showError(err.message));
  };

  const onBackClick = () => {
    navigate(`/items`);
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={onBackClick} />
      <SaveButton onClick={onSaveClick} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default ItemCreationActions;
