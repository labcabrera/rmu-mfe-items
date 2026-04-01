import React, { FC, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchAttackTables } from '../../api/attack-tables';

const SelectAttackTable: FC<{
  label?: string;
  value?: string;
  name?: string;
  required?: boolean;
  onChange: (table: string | null) => void;
}> = ({ value, label = t('Attack table'), name = 'attack-table', required = true, onChange }) => {
  const { showError } = useError();
  const [tables, setTables] = useState<string[]>();

  useEffect(() => {
    fetchAttackTables()
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
        <TextField {...params} label={label} name={name} variant="outlined" fullWidth error={required && !value} />
      )}
    />
  );
};

export default SelectAttackTable;
