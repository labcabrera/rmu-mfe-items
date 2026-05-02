/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { ClearableTextField } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectArmorSlot from '../../shared/selects/SelectItemCategory';

const ItemListSearch: FC<{
  onSearch: (name: string, category: string) => void;
}> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    onSearch(name, category);
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
};

export default ItemListSearch;
