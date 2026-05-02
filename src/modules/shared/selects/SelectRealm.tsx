/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Autocomplete, TextField } from '@mui/material';
import { fetchRealms, Realm } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function SelectRealm({
  label = 'realm',
  value,
  required,
  onChange,
}: {
  label?: string;
  value: string | null;
  required?: boolean;
  onChange: (_: Realm | null) => void;
}) {
  const auth = useAuth();
  const { t } = useTranslation();
  const [realms, setRealms] = useState<Realm[]>();
  const selectedRealm = realms ? realms.find((r) => r.id === value) || null : null;

  useEffect(() => {
    fetchRealms('', 0, 100, auth).then((response) => setRealms(response.content));
  }, []);

  return (
    <Autocomplete<Realm, false, false, false>
      options={realms || []}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      value={selectedRealm}
      onChange={(_, newValue) => onChange(newValue)}
      fullWidth
      disablePortal={false}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={t(label)}
            // variant="outlined"
            error={required && (value === undefined || value === null || value === '')}
          />
        );
      }}
    />
  );
}
