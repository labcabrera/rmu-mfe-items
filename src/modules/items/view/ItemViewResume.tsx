/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';
import { fetchRealm, Item, Realm } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

export default function ItemViewResume({ item }: { item: Item }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [realm, setRealm] = useState<Realm>();

  useEffect(() => {
    if (item && item.realmId) {
      fetchRealm(item.realmId, auth)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [item]);

  return (
    <>
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
