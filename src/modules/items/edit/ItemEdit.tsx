import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchItem } from '../../api/item';
import { Item, UpdateItemDto } from '../../api/item.dto';
import ItemAvatar from '../../shared/avatars/ItemAvatar';
import ItemEditActions from './ItemEditActions';
import ItemEditInfoAttributes from './ItemEditInfoAttributes';
import ItemEditResume from './ItemEditResume';

const ItemEdit: FC = () => {
  const { showError } = useError();

  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<UpdateItemDto>({} as UpdateItemDto);

  const onImageUpdated = (updatedItem: Item) => {
    setItem(updatedItem);
    setFormData({ ...formData, imageUrl: updatedItem.imageUrl });
  };

  useEffect(() => {
    if (item) {
      setFormData({
        realmId: item.realm.id,
        weapon: item.weapon || undefined,
        armor: item.armor || undefined,
        shield: item.shield || undefined,
        info: item.info || undefined,
        stackable: item.stackable,
        description: item.description || undefined,
        imageUrl: item.imageUrl || undefined,
      });
    }
  }, [item]);

  useEffect(() => {
    if (itemId) {
      fetchItem(itemId)
        .then((response) => setItem(response))
        .catch((err) => showError(err.message));
    }
  }, [itemId, showError]);

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
          <ItemEditInfoAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
      <Accordion sx={{ mt: 5 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="npc-debug" id="npc-debug-header">
          <Typography component="span">Debug</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ItemEdit;
