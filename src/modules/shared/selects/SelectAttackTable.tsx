import React, { FC } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { t } from 'i18next';

const SelectAttackTable: FC<{
  label: string;
  value: string;
  name: string;
  tables: string[];
  onChange: (table: string) => void;
}> = ({ label, value, name, tables, onChange }) => {
  if (!tables) return <p>Loading...</p>;

  return (
    <Autocomplete
      options={tables}
      value={value}
      onChange={(_, newValue) => onChange(newValue || '')}
      getOptionLabel={(option) => t(option)}
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField {...params} label={label} name={name} variant="outlined" fullWidth error={!value} />
      )}
    />
  );
};

export default SelectAttackTable;
