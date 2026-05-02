import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Item } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemModifiersPanel({ item }: { item: Item }) {
  const { t } = useTranslation();
  const modifiers = item?.modifiers ?? [];

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          {modifiers.length === 0 && (
            <Grid size={12}>
              <Typography color="textSecondary">No modifiers</Typography>
            </Grid>
          )}

          {modifiers.map((m) => (
            <Grid key={m.id} size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    {t(m.type)}
                  </Typography>
                  <Typography variant="body2">Tipo: {String(m.type)}</Typography>
                  {m.modifier !== null && m.modifier !== '' && (
                    <Typography variant="body2">Objetivo: {String(m.modifier)}</Typography>
                  )}
                  {m.value !== undefined && m.value !== null && (
                    <Typography variant="body2">Valor: {String(m.value)}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
