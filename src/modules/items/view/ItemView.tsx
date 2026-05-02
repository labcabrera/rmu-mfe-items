import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useParams } from 'react-router-dom';
import { Card, CardContent, Grid } from '@mui/material';
import {
  EditableAvatar,
  fetchItem,
  Item,
  TechnicalInfo,
  updateItem,
  UpdateItemDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import { getItemImages } from '../../services/image-service';
import ItemViewActions from './ItemViewActions';
import ItemViewContent from './ItemViewContent';
import ItemViewResume from './ItemViewResume';

export default function ItemView() {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const { showError } = useError();
  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<Item>();

  const updateItemImage = (imageUrl: string) => {
    const dto = { imageUrl } as UpdateItemDto;
    updateItem(item!.id, dto, auth)
      .then((response) => setItem(response))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (location.state && location.state.item) {
      setItem(location.state.item);
    } else if (itemId) {
      fetchItem(itemId, auth)
        .then((response) => setItem(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, itemId, auth, showError]);

  if (!item) return <p>{t('no-results')}</p>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <Card variant="outlined">
            <CardContent>
              <EditableAvatar
                imageUrl={item.imageUrl}
                variant="square"
                images={getItemImages()}
                onImageChange={(e) => updateItemImage(e)}
              />
              <ItemViewResume item={item} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={gridSizeMain}>
          <Card variant="outlined">
            <CardContent>
              <ItemViewActions item={item} setItem={setItem} />
              <ItemViewContent item={item} />
              <TechnicalInfo>
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </TechnicalInfo>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
