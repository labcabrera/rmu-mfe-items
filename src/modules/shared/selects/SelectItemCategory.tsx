import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';

const SelectItemCategory: FC<{
  label: string;
  value: string | null;
  name: string;
  required?: boolean;
  onChange: (value: string | null) => void;
}> = ({ label, value, name, onChange, required = false }) => {
  const { t } = useTranslation();

  const values = ['weapon', 'armor', 'shield', 'clothes', 'coins', 'tools', 'food', 'ammunition', 'other'];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue === '' ? null : selectedValue);
  };

  return (
    <TextField
      select
      name={name}
      label={label}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      variant="outlined"
      onChange={handleChange}
      error={required && (value === undefined || value === null || value === '')}
    >
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectItemCategory;
