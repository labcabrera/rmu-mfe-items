/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';
import {
  EditableAvatar,
  fetchRealm,
  Item,
  Realm,
  updateItem,
  UpdateItemDto,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

export default function ItemViewResume({ item, setItem }: { item: Item; setItem: (item: Item) => void }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [realm, setRealm] = useState<Realm>();

  const updateItemImage = (imageUrl: string) => {
    const dto = { imageUrl } as UpdateItemDto;
    updateItem(item!.id, dto, auth)
      .then((response) => setItem(response))
      .catch((err) => notify.error(err));
  };

  useEffect(() => {
    if (item && item.realmId) {
      fetchRealm(item.realmId, auth)
        .then((response) => setRealm(response))
        .catch((err) => notify.error(err));
    }
  }, [item]);

  return (
    <>
      <EditableAvatar imageUrl={item.imageUrl} variant="rounded" onImageChange={(e) => updateItemImage(e)} />
      <Stack direction="column" spacing={1}>
        <Typography variant="h6" color="primary" gutterBottom>
          {t(item.name)}
        </Typography>
        <Typography variant="body1" color="primary" gutterBottom>
          {t(item.category)}
        </Typography>
        {realm && (
          <Typography variant="body1" gutterBottom>
            <Link
              component={RouterLink}
              to={`/core/realms/view/${item.realmId}`}
              color="primary"
              sx={{ '&:visited': { color: 'primary.main' } }}
            >
              {t(realm.name)}
            </Link>
          </Typography>
        )}
        <Typography variant="caption" gutterBottom>
          {t(item.description || 'No description available.')}
        </Typography>
      </Stack>
    </>
  );
}
