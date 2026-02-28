import React, { FC } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import { t } from 'i18next';
import { Item } from '../../api/item.dto';

const ItemViewResume: FC<{
  item: Item;
}> = ({ item }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            {t(item.id)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href={`/core/realms/view/${item.realm.id}`} color="textPrimary">
              {item.realm?.name || 'Loading realm...'}
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t(item.category)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t(item.description || 'No description available.')}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemViewResume;
