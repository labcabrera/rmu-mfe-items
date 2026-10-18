/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import {
  FilterBar,
  fetchRealms,
  ITEM_RARITIES,
  Realm,
  RmuSelect,
  rsqlAnd,
  SearchField,
  SelectRealm,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectItemCategory from '../../shared/selects/SelectItemCategory';

/** Filters of the item list, reported as an RSQL query. */
export default function ItemListFilters({ onChange }: { onChange: (rsql: string) => void }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const [realms, setRealms] = useState<Realm[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>();
  const [realmId, setRealmId] = useState<string>();
  const [rarity, setRarity] = useState<string>();

  useEffect(() => {
    onChange(
      rsqlAnd([
        ['name=re=', name],
        ['category==', category],
        ['info.rarity==', rarity],
        ['realmId==', realmId],
      ])
    );
  }, [name, category, rarity, realmId]);

  useEffect(() => {
    fetchRealms('', 0, 100, auth).then((response) => setRealms(response.content));
  }, []);

  return (
    <FilterBar>
      <SearchField value={name} onChange={setName} />
      <SelectItemCategory
        value={category || ''}
        onChange={(value) => setCategory(value || undefined)}
        label={t('category')}
        name="category"
        allowAll
      />
      <SelectRealm value={realmId ?? null} realms={realms} onChange={(id) => setRealmId(id ?? undefined)} />
      <RmuSelect
        value={rarity || ''}
        label={t('rarity')}
        emptyOption="all"
        options={ITEM_RARITIES}
        onChange={(value) => setRarity(value || undefined)}
      />
    </FilterBar>
  );
}
