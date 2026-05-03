/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Autocomplete, TextField } from '@mui/material';
import { fetchAttackTables } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const SelectAttackTable: FC<{
  label?: string;
  value?: string;
  name?: string;
  required?: boolean;
  onChange: (table: string | null) => void;
}> = ({ value, label = 'attack-table', name = 'attack-table', required = true, onChange }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [tables, setTables] = useState<string[]>();

  useEffect(() => {
    fetchAttackTables(auth)
      .then(setTables)
      .catch((err) => showError(err.message));
  }, []);

  if (!tables) return <p>Loading attack tables...</p>;

  return (
    <Autocomplete
      options={tables}
      value={value}
      onChange={(_, newValue) => onChange(newValue || null)}
      getOptionLabel={(option) => t(option)}
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField {...params} label={t(label)} name={name} variant="outlined" fullWidth error={required && !value} />
      )}
    />
  );
};

export default SelectAttackTable;
