import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';

const SelectArmorType: FC<{
  label: string;
  value: number;
  name?: string;
  onChange: (value: number) => void;
}> = ({ label, value, name = 'at', onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value as unknown as number;
    onChange(selectedValue);
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
      error={!value}
      helperText={!value ? t('required-armor-type') : ''}
    >
      {Array.from({ length: 10 }, (_, i) => i + 1).map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectArmorType;
