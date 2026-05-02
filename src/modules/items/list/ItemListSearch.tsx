/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { ClearableTextField, fetchRealms, Realm, RmuSelect, SelectRealm } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectItemCategory from '../../shared/selects/SelectItemCategory';

// eslint-disable-next-line no-unused-vars
export default function ItemListSearch({ onChange }: { onChange: (rsql: string) => void }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const [realms, setRealms] = useState<Realm[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>();
  const [realmId, setRealmId] = useState<string>();
  const [rarity, setRarity] = useState<string>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  useEffect(() => {
    fetchRealms('', 0, 100, auth).then((response) => setRealms(response.content));
  }, []);

  return (
    <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
      <ClearableTextField value={name} onChange={(e) => setName(e.target.value)} label={t('Name')} name={'Name'} />
      <SelectItemCategory
        value={category || ''}
        onChange={(value) => setCategory(value || '')}
        label={t('category')}
        name={'category'}
        allowAll
      />
      <SelectRealm value={''} realms={realms} onChange={(e) => setRealmId(e || undefined)} />
      <RmuSelect value={realmId || ''} label={t('rarity')} options={[]} onChange={(e) => setRarity(e)} />
    </Stack>
  );
}
