import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchItem } from '../../api/item';
import { Item, UpdateItemDto } from '../../api/item.dto';
import ItemAvatar from '../../shared/avatars/ItemAvatar';
import ItemEditActions from './ItemEditActions';
import ItemEditAttributes from './ItemEditAttributes';
import ItemEditResume from './ItemEditResume';

const ItemEdit: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<UpdateItemDto | null>(null);

  const onImageUpdated = (updatedItem: Item) => {
    setItem(updatedItem);
    setFormData({ ...formData, imageUrl: updatedItem.imageUrl });
  };

  useEffect(() => {
    if (item) {
      const { id, imageUrl, realmId, ...rest } = item;
      setFormData({
        ...rest,
      });
    }
  }, [item]);

  useEffect(() => {
    if (itemId) {
      fetchItem(itemId)
        .then((response) => setItem(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, itemId, showError]);

  if (!item || !formData) return <div>Loading item...</div>;

  return (
    <>
      <ItemEditActions item={item} formData={formData} />
      <Grid container spacing={2}>
        <Grid size={2}>
          <ItemAvatar item={item} onItemUpdated={onImageUpdated} />
          <ItemEditResume formData={formData!} setFormData={setFormData} />
        </Grid>
        <Grid size={8}>
          <ItemEditAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default ItemEdit;
