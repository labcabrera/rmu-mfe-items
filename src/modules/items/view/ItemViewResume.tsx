import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { fetchRealm, Item, Realm, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';

export default function ItemViewResume({ item }: { item: Item }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        <RmuTextCard
          value={t(item.category)}
          subtitle={t('category')}
          image={`${imageBaseUrl}images/items/category-${item.category}.png`}
        />
        {realm && (
          <RmuTextCard
            value={realm.name}
            subtitle={t('realm')}
            image={realm.imageUrl!}
            onClick={() => navigate(`/core/realms/view/${item.realmId}`)}
          />
        )}
        <Typography variant="body1" gutterBottom>
          {t(item.description || 'No description available.')}
        </Typography>
      </Stack>
    </>
  );
}
