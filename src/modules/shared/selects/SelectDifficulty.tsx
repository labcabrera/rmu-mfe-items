import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';

const SelectDifficulty: FC<{
  label: string;
  value: string | null;
  name?: string;
  onChange: (value: string | null) => void;
}> = ({ label, value, name = 'difficulty', onChange }) => {
  const { t } = useTranslation();

  const values: string[] = ['c', 's'];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
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
      error={value === undefined || value === null}
      helperText={value === undefined || value === null ? t('required-difficulty') : ''}
    >
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectDifficulty;
