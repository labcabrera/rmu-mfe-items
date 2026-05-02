/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import { EditableAvatar, fetchItem, Item, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import ItemForm from '../shared/ItemForm';
import ItemEditActions from './ItemEditActions';

export default function ItemEdit() {
  const auth = useAuth();
  const { showError } = useError();
  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<Item>();
  const [formData, setFormData] = useState<Item>({} as Item);

  const itemImageUrl = item?.imageUrl ? item.imageUrl : `${imageBaseUrl}images/items/${item?.id}.png`;

  const onImageChanged = (imageUrl: string) => {
    showError('Not implemented image update ' + imageUrl);
  };

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  useEffect(() => {
    if (itemId) {
      fetchItem(itemId, auth)
        .then((response) => setItem(response))
        .catch((err) => showError(err.message));
    }
  }, [itemId]);

  if (!item || !formData) return <div>Loading item...</div>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <EditableAvatar imageUrl={itemImageUrl} images={[]} onImageChange={(image) => onImageChanged(image)} />
        </Grid>
        <Grid size={gridSizeMain}>
          <ItemEditActions item={item} formData={formData} />
          <Paper sx={{ p: 2 }}>
            <ItemForm formData={formData} setFormData={setFormData} />
          </Paper>
          <TechnicalInfo>
            <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
}
