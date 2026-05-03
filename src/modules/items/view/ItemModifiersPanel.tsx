import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Item, Section } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemModifiersPanel({ item }: { item: Item }) {
  const { t } = useTranslation();
  const modifiers = item?.modifiers ?? [];

  return (
    <Section title={t('modifiers')}>
      <Grid container spacing={1}>
        {modifiers.length === 0 && (
          <Grid size={12}>
            <Typography color="textSecondary">No modifiers</Typography>
          </Grid>
        )}
        {modifiers.map((m) => (
          <Grid key={m.id} size={{ xs: 12, sm: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  {t(m.type)}
                </Typography>
                {m.value !== undefined && m.value !== null && (
                  <Typography variant="body2" color={m.value > 0 ? 'success' : m.value < 0 ? 'error' : undefined}>
                    {m.value > 0 ? `+${m.value}` : `${m.value}`}
                  </Typography>
                )}
                {m.modifier !== null && m.modifier !== '' && <Typography variant="body2">{t(m.modifier)}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
