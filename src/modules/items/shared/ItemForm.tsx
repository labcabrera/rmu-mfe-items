/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material';
import {
  CategorySeparator,
  fetchRealms,
  Item,
  ITEM_RARITIES,
  ItemRarity,
  NumericInput,
  Realm,
  RmuSelect,
  SelectRealm,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import SelectItemCategory from '../../shared/selects/SelectItemCategory';
import ItemFormArmor from './ItemFormArmor';
import ItemFormModifiers from './ItemFormModifiers';
import ItemFormShield from './ItemFormShield';
import ItemFormWeapon from './ItemFormWeapon';

export default function ItemForm({
  formData,
  setFormData,
}: {
  formData: Item;
  setFormData: Dispatch<SetStateAction<Item>>;
}) {
  const { t } = useTranslation();
  const auth = useAuth();
  const { showError } = useError();
  const [realms, setRealms] = useState<Realm[]>();

  useEffect(() => {
    fetchRealms('', 0, 100, auth)
      .then((realms) => setRealms(realms.content))
      .catch((err) => showError(err.message));
  }, []);

  const onChangeCategory = (category: string | null) => {
    const nextCategory = category || '';
    const next: Partial<typeof formData> = { category: nextCategory };
    // const info = { cost: { min: 0, average: 0, max: 0 } };
    if (nextCategory === 'weapon') {
      next.weapon = { skillId: '', fumble: 0, modes: [] };
      next.armor = undefined;
      next.shield = undefined;
    } else if (nextCategory === 'armor') {
      next.armor = {
        slot: 'body',
        at: 0,
        enc: 0,
        maneuverPenalty: 0,
        rangedPenalty: 0,
        perceptionPenalty: 0,
        baseDifficulty: '',
      };
      next.weapon = undefined;
      next.shield = undefined;
    } else if (nextCategory === 'shield') {
      next.shield = { db: 0, blockCount: 0 };
      next.weapon = undefined;
      next.armor = undefined;
    } else {
      next.weapon = undefined;
      next.armor = undefined;
      next.shield = undefined;
    }
    setFormData({ ...formData, ...next });
  };

  if (!formData || !realms) return <p>Loading item info...</p>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <TextField
            label={t('name')}
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!formData.name}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <SelectItemCategory
            label={t('category')}
            name="category"
            value={formData.category}
            required
            onChange={onChangeCategory}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <SelectRealm
            value={formData.realmId || null}
            onChange={(realm) => setFormData({ ...formData, realmId: realm })}
            realms={realms}
          />
        </Grid>

        <Grid size={12}>
          <CategorySeparator text={t('Information')} />
        </Grid>
        <Grid size={3}>
          <NumericInput
            value={formData.info!.length ?? null}
            onChange={(length) => setFormData({ ...formData, info: { ...formData.info, length } })}
            integer={false}
            label={t('length')}
            maxFractionDigits={2}
            allowNegatives={false}
            min={0}
          />
        </Grid>
        <Grid size={3}>
          <NumericInput
            value={formData.info!.weight ?? null}
            onChange={(weight) => setFormData({ ...formData, info: { ...formData.info, weight } })}
            integer={false}
            label={t('weight')}
            maxFractionDigits={3}
            allowNegatives={false}
            min={0}
          />
        </Grid>
        <Grid size={3}>
          <NumericInput
            value={formData.info!.strength ?? null}
            onChange={(strength) => setFormData({ ...formData, info: { ...formData.info, strength } })}
            integer={true}
            label={t('strength')}
          />
        </Grid>
        <Grid size={3}>
          <NumericInput
            value={formData.info!.productionHours ?? null}
            onChange={(productionHours) => setFormData({ ...formData, info: { ...formData.info, productionHours } })}
            integer={false}
            label={t('production-hours')}
            min={0.01}
            maxFractionDigits={2}
          />
        </Grid>
        <Grid size={3}>
          <NumericInput
            value={formData.info!.cost?.min ?? null}
            onChange={(v) =>
              setFormData({ ...formData, info: { ...formData.info, cost: { ...formData.info.cost!, min: v! } } })
            }
            integer={false}
            label={t('cost-min')}
            min={0.0001}
            maxFractionDigits={4}
          />
        </Grid>
        <Grid size={3}>
          <NumericInput
            value={formData.info!.cost?.average ?? null}
            onChange={(v) =>
              setFormData({ ...formData, info: { ...formData.info, cost: { ...formData.info.cost!, average: v! } } })
            }
            integer={false}
            label={t('cost-average')}
            min={0.0001}
            maxFractionDigits={4}
          />
        </Grid>
        <Grid size={3}>
          <NumericInput
            value={formData.info!.cost?.max ?? null}
            onChange={(v) =>
              setFormData({ ...formData, info: { ...formData.info, cost: { ...formData.info.cost!, max: v! } } })
            }
            integer={false}
            label={t('cost-max')}
            min={0.0001}
            maxFractionDigits={4}
          />
        </Grid>
        <Grid size={3}>
          <RmuSelect
            value={formData.info.rarity}
            label={t('rarity')}
            options={ITEM_RARITIES}
            onChange={(e) => setFormData({ ...formData, info: { ...formData.info, rarity: e as ItemRarity } })}
          />
        </Grid>
        <Grid size={3}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={formData.info.stackable} />}
              label={t('stackable')}
              onChange={(_, v) => setFormData({ ...formData, info: { ...formData.info, stackable: v } })}
            />
          </FormGroup>
        </Grid>
        <Grid size={3}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={formData.info.unique} />}
              label={t('unique')}
              onChange={(_, v) =>
                setFormData({
                  ...formData,
                  info: { ...formData.info, unique: v },
                })
              }
            />
          </FormGroup>
        </Grid>

        <Grid size={12}>
          {formData.armor && <ItemFormArmor formData={formData} setFormData={setFormData} />}
          {formData.weapon && <ItemFormWeapon formData={formData} setFormData={setFormData} />}
          {formData.shield && <ItemFormShield formData={formData} setFormData={setFormData} />}
        </Grid>

        <Grid size={12}>
          <ItemFormModifiers formData={formData} setFormData={setFormData} />
        </Grid>

        <Grid size={12}>
          <TextField
            label={t('description')}
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </>
  );
}
