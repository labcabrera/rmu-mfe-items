import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Link, Typography } from '@mui/material';
import { Item } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemViewResume({ item }: { item: Item }) {
  const { t } = useTranslation();

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            {t(item.id)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t(item.category)}
          </Typography>
          {item.realm && (
            <Typography variant="body1" gutterBottom>
              <Link href={`/core/realms/view/${item.realm.id}`} color="textPrimary">
                {item.realm?.name || 'Loading realm...'}
              </Link>
            </Typography>
          )}
          <Typography variant="body1" gutterBottom>
            {t(item.description || 'No description available.')}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
