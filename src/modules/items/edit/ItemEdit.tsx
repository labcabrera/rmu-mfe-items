/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { EditableAvatar, fetchItem, Item, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import ItemForm from '../shared/ItemForm';
import ItemEditActions from './ItemEditActions';

const ItemEdit: FC = () => {
  const { showError } = useError();
  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<Item>();
  const [formData, setFormData] = useState<Item>();

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
      fetchItem(itemId)
        .then((response) => setItem(response))
        .catch((err) => showError(err.message));
    }
  }, [itemId]);

  if (!item || !formData) return <div>Loading item...</div>;

  return (
    <>
      <ItemEditActions item={item} formData={formData} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <EditableAvatar imageUrl={itemImageUrl} images={[]} onImageChange={(image) => onImageChanged(image)} />
        </Grid>
        <Grid size={gridSizeMain}>
          <ItemForm formData={formData} setFormData={setFormData} />
        </Grid>
        <TechnicalInfo>
          <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
        </TechnicalInfo>
      </Grid>
    </>
  );
};

export default ItemEdit;
