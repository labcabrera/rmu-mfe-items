/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { ClearableTextField } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectArmorSlot from '../../shared/selects/SelectItemCategory';

// eslint-disable-next-line no-unused-vars
export default function ItemListSearch({ onChange }: { onChange: (rsql: string) => void }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    let rsql = '';
    if (name) rsql += `name=re=${name}`;
    if (category) {
      if (rsql) rsql += ';';
      rsql += `category==${category}`;
    }
    onChange(rsql);
  };

  useEffect(() => {
    handleSearch();
  }, [name, category]);

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
      <ClearableTextField value={name} onChange={(e) => setName(e.target.value)} label={t('Name')} name={'Name'} />
      <SelectArmorSlot
        value={category}
        onChange={(value) => setCategory(value || '')}
        label={t('category')}
        name={'category'}
        allowAll
      />
    </Box>
  );
}
