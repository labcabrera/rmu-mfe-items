import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { ItemArmorSlot } from '../../api/item.dto';

const values: ItemArmorSlot[] = ['head', 'body', 'arms', 'legs'];

const SelectArmorSlot: FC<{
  label: string;
  value: ItemArmorSlot | null;
  name: string;
  onChange: (value: ItemArmorSlot) => void;
}> = ({ label, value, name, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value as ItemArmorSlot;
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
      error={value === undefined || value === null}
    >
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectArmorSlot;
