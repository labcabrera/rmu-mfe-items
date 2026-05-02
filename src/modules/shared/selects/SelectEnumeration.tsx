import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Autocomplete, TextField } from '@mui/material';
import { Enumeration } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function SelectEnumeration({
  label,
  value,
  name,
  rsql = '',
  onChange,
}: {
  label: string;
  value: string;
  name: string;
  rsql?: string;
  onChange: (enumeration: Enumeration | null) => void;
}) {
  const auth = useAuth();
  const { t } = useTranslation();
  const [enumerations, setEnumerations] = useState<Enumeration[]>();
  const selectedEnumeration = (enumerations || []).find((e) => e.id === value) || null;

  useEffect(() => {
    fetchEnumerations(rsql, 0, 500, auth).then((response) => setEnumerations(response.content));
  }, []);

  if (!skills) return <p>Loading...</p>;

  return (
    <Autocomplete
      options={enumerations}
      value={selectedEnumeration}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={(option) => t(option.id)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField {...params} label={label} name={name} variant="outlined" fullWidth error={!value} />
      )}
    />
  );
}
