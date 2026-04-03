/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { fetchItem } from '../../api/item';
import { Item } from '../../api/item.dto';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import ItemAvatar from '../../shared/avatars/ItemAvatar';
import ItemForm from '../shared/ItemForm';
import ItemEditActions from './ItemEditActions';

const ItemEdit: FC = () => {
  const { showError } = useError();
  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<Item>();
  const [formData, setFormData] = useState<Item>();

  const onImageUpdated = (updatedItem: Item) => {
    setItem(updatedItem);
    setFormData({ ...formData!, imageUrl: updatedItem.imageUrl });
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
          <ItemAvatar item={item} onItemUpdated={onImageUpdated} />
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
