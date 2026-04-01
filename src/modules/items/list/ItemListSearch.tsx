import React, { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ClearableTextField } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import SelectArmorSlot from '../../shared/selects/SelectItemCategory';

const ItemListSearch: FC<{
  onSearch: (id: string, category: string) => void;
}> = ({ onSearch }) => {
  const [id, setId] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    onSearch(id, category);
  };

  useEffect(() => {
    handleSearch();
  }, [id, category]);

  return (
    <Box display="flex" gap={2} alignItems="center" mb={2}>
      <ClearableTextField value={id} onChange={(e) => setId(e.target.value)} label={t('Name')} name={'Name'} />
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
