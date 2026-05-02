import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  CancelButton,
  createItem,
  CreateItemDto,
  Item,
  RmuBreadcrumbs,
  SaveButton,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const ItemCreationActions: FC<{
  formData: Item;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [{ name: t('Items'), link: '/items' }, { name: t('Creation') }];

  const onSaveClick = () => {
    const dto = formData as unknown as CreateItemDto;
    createItem(dto, auth)
      .then((item) => navigate(`/items/view/${item.id}`))
      .catch((err) => showError(err.message));
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
