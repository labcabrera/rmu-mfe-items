/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { getItemImages } from '../../services/image-service';

export default function ItemViewResume({
  item,
  setItem,
}: {
  item: Item;
  setItem: Dispatch<SetStateAction<Item | undefined>>;
}) {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [realm, setRealm] = useState<Realm>();

  const updateItemImage = (imageUrl: string) => {
    const dto = { imageUrl } as UpdateItemDto;
    updateItem(item!.id, dto, auth)
      .then((response) => setItem(response))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (item && item.realmId) {
      fetchRealm(item.realmId, auth)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [item]);

  return (
    <>
      <EditableAvatar
        imageUrl={item.imageUrl}
        variant="rounded"
        images={getItemImages()}
        onImageChange={(e) => updateItemImage(e)}
      />
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
