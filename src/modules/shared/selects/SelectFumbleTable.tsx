/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Autocomplete, TextField } from '@mui/material';
import { fetchFumbleTables } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const SelectFumbleTable: FC<{
  value?: string;
  label?: string;
  name?: string;
  required?: boolean;
  onChange: (table: string) => void;
}> = ({ value, label = 'fumble-table', name = 'fumble-table', required = true, onChange }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [tables, setTables] = useState<string[]>();

  useEffect(() => {
    fetchFumbleTables(auth)
      .then(setTables)
      .catch((err) => showError(err.message));
  }, []);

  if (!tables) return <p>Loading fumble tables...</p>;

  return (
    <Autocomplete
      options={tables}
      value={value}
      onChange={(_, newValue) => onChange(newValue || '')}
      getOptionLabel={(option) => t(option)}
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField {...params} label={t(label)} name={name} variant="outlined" fullWidth error={required && !value} />
      )}
    />
  );
};

export default SelectFumbleTable;
