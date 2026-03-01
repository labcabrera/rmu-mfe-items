import React, { FC, useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, Box, IconButton } from '@mui/material';
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
      <TextField
        label={t('item-identifier')}
        value={id}
        onChange={(e) => setId(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <SelectArmorSlot
        value={category}
        onChange={(value) => setCategory(value || '')}
        label={t('category')}
        name={'category'}
      />
      <IconButton
        onClick={() => {
          setId('');
          setCategory('');
        }}
        title={t('clear')}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

export default ItemListSearch;
