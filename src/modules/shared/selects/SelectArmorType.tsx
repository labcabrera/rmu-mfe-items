import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';

const SelectArmorType: FC<{
  label: string;
  value: number | undefined;
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
      onChange={handleChange}
      error={!value}
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
