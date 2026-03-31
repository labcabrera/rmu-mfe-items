import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { GenericAvatar, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { fetchItem } from '../../api/item';
import { Item } from '../../api/item.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import ItemViewActions from './ItemViewActions';
import ItemViewAttributes from './ItemViewAttributes';
import ItemViewResume from './ItemViewResume';

const ItemView: FC = () => {
  const { showError } = useError();
  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    if (itemId) {
      fetchItem(itemId)
        .then((response) => setItem(response))
        .catch((err) => showError(err.message));
    }
  }, [itemId, showError]);

  if (!item) return <p>Item not found.</p>;

  return (
    <>
      <ItemViewActions item={item} setItem={setItem} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/items/${item.id}.png`} />
          <ItemViewResume item={item} />
        </Grid>
        <Grid size={gridSizeMain}>
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
