import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchItem } from '../../api/item';
import { Item } from '../../api/item.dto';
import ItemAvatar from '../../shared/avatars/ItemAvatar';
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

      <Grid container spacing={2}>
        <Grid size={2}>
          <ItemAvatar item={item} onItemUpdated={setItem} />
          <ItemViewResume item={item} />
        </Grid>
        <Grid size={10}>
          <ItemViewAttributes item={item} />
        </Grid>
      </Grid>
      <Accordion sx={{ mt: 5 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="npc-debug" id="npc-debug-header">
          <Typography component="span">Debug</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ItemView;
