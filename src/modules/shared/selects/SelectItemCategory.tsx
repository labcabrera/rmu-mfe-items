import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';
import { ITEM_CATEGORIES } from '@labcabrera-rmu/rmu-react-shared-lib';

const SelectItemCategory: FC<{
  label: string;
  value: string | null;
  name: string;
  required?: boolean;
  allowAll?: boolean;
  onChange: (value: string | null) => void;
}> = ({ label, value, name, required = false, allowAll = false, onChange }) => {
  const { t } = useTranslation();

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
      size="small"
      fullWidth
      onChange={handleChange}
      error={required && (value === undefined || value === null || value === '')}
    >
      {allowAll && (
        <MenuItem key="all" value="">
          <em>{t('all')}</em>
        </MenuItem>
      )}
      {ITEM_CATEGORIES.map((option) => (
        <MenuItem key={option} value={option}>
          {t(`item-category-${option}`, t(option))}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectItemCategory;
