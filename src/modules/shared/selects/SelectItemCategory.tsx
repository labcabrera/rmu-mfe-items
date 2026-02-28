import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField } from '@mui/material';

const SelectItemCategory: FC<{
  label: string;
  value: string;
  name: string;
  required?: boolean;
  onChange: (value: string | null) => void;
}> = ({ label, value, name, onChange, required = false }) => {
  const { t } = useTranslation();

  const values = ['weapon', 'armor', 'shield', 'clothes', 'coins', 'tools', 'food', 'ammunition', 'other'];

  const getOptionLabel = (option: string) => {
    if (option === '') return '';
    return t(option);
  };

  const hasError = required && (value === undefined || value === null || value === '');

  return (
    <Autocomplete
      options={values}
      value={value === undefined || value === null ? '' : value}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          variant="standard"
          fullWidth
          error={hasError}
          helperText={hasError ? t('category-is-required') : ''}
        />
      )}
    />
  );
};

export default SelectItemCategory;
