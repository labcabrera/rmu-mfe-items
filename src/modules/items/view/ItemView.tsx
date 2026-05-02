/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { fetchItem, GenericAvatar, Item, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import ItemViewActions from './ItemViewActions';
import ItemViewAttributes from './ItemViewAttributes';
import ItemViewResume from './ItemViewResume';

const ItemView: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    if (itemId) {
      fetchItem(itemId, auth)
        .then((response) => setItem(response))
        .catch((err) => showError(err.message));
    }
  }, [itemId]);

  if (!item) return <p>{t('no-results')}</p>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/items/${item.id}.png`} variant="square" />
          <ItemViewResume item={item} />
        </Grid>
        <Grid size={gridSizeMain}>
          <ItemViewActions item={item} setItem={setItem} />
          <ItemViewAttributes item={item} />
          <TechnicalInfo>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemView;
