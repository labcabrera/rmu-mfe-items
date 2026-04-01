/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { FormControl, Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CategorySeparator } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { NamedEntity } from '../../api/common.dto';
import { CreateItemDto } from '../../api/item.dto';
import { fetchRealms } from '../../api/realm';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectItemCategory from '../../shared/selects/SelectItemCategory';
import SelectRealm from '../../shared/selects/SelectRealm';
import ItemFormArmor from './ItemFormArmor';
import ItemFormWeapon from './ItemFormWeapon';

const ItemForm: FC<{
  formData: CreateItemDto;
  setFormData: Dispatch<SetStateAction<CreateItemDto>>;
}> = ({ formData, setFormData }) => {
  const { showError } = useError();
  const [realms, setRealms] = useState<NamedEntity[]>();

  useEffect(() => {
    fetchRealms('', 0, 100)
      .then((realms) => setRealms(realms))
      .catch((err) => showError(err.message));
  }, []);

  const onChangeCategory = (category: string | null) => {
    const nextCategory = category || '';
    const next: Partial<typeof formData> = { category: nextCategory };
    const info = { cost: { min: 0, average: 0, max: 0 } };
    if (nextCategory === 'weapon') {
      next.weapon = { skillId: '', fumble: 0, modes: [] };
      next.armor = undefined;
      next.shield = undefined;
    } else if (nextCategory === 'armor') {
      next.armor = { slot: undefined, at: 0, enc: 0, maneuver: 0, rangedPenalty: 0, perception: 0, baseDifficulty: '' };
      next.weapon = undefined;
      next.shield = undefined;
    } else if (nextCategory === 'shield') {
      next.shield = { attacks: 0 };
      next.weapon = undefined;
      next.armor = undefined;
    } else {
      next.weapon = undefined;
      next.armor = undefined;
      next.shield = undefined;
    }
    setFormData({ ...formData, ...next, info });
  };

  const updateWeight = (weight: number | null) => {
    const weightPercent = weight ? null : formData.info!.weightPercent;
    setFormData((prev) => ({
      ...prev,
      info: { ...prev.info, weight: weight === null ? undefined : weight, weightPercent },
    }));
  };

  const updateWeightPercent = (weightPercent: number | null) => {
    const weight = weightPercent ? null : formData.info!.weight;
    setFormData((prev) => ({
      ...prev,
      info: { ...prev.info, weight, weightPercent: weightPercent === null ? undefined : weightPercent },
    }));
  };

  if (!formData || !realms) return <p>Loading item info...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, lg: 3 }}>
        <TextField
          label={t('item-identifier')}
          variant="outlined"
          name="item-identifier"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          fullWidth
          error={!formData.id || formData.id.trim() === ''}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 3 }}>
        <SelectRealm
          label={t('realm')}
          realms={realms}
          value={formData.realmId}
          required
          onChange={(realm) => setFormData({ ...formData, realmId: realm ? realm.id : '' })}
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
          onChange={(weight) => updateWeight(weight)}
          integer={false}
          label={t('weight')}
          maxFractionDigits={3}
          allowNegatives={false}
          min={0}
        />
      </Grid>
      <Grid size={3}>
        <NumericInput
          value={formData.info!.weightPercent ?? null}
          onChange={(weightPercent) => updateWeightPercent(weightPercent)}
          integer={false}
          label={t('weight-percent')}
          maxFractionDigits={2}
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
            setFormData({
              ...formData,
              info: { ...formData.info, cost: { ...formData.info!.cost, min: v ?? 0 } },
            })
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
            setFormData({
              ...formData,
              info: { ...formData.info, cost: { ...formData.info!.cost, average: v ?? 0 } },
            })
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
            setFormData({
              ...formData,
              info: { ...formData.info, cost: { ...formData.info!.cost, max: v ?? 0 } },
            })
          }
          integer={false}
          label={t('cost-max')}
          min={0.0001}
          maxFractionDigits={4}
        />
      </Grid>
      <Grid size={6}>
        <FormControl sx={{ mt: 1 }}>
          <ToggleButtonGroup
            value={formData.info.stackable || false}
            exclusive
            size="small"
            onChange={(_, val) =>
              setFormData({ ...formData, info: { ...formData.info!, stackable: val === null ? undefined : val } })
            }
          >
            <ToggleButton value={false} size="small" sx={{ minWidth: 100 }}>
              Single
            </ToggleButton>
            <ToggleButton value={true} size="small" sx={{ minWidth: 100 }}>
              Stackable
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
      </Grid>

      <Grid size={12}>
        {formData.armor && <ItemFormArmor formData={formData} setFormData={setFormData} />}
        {formData.weapon && <ItemFormWeapon formData={formData} setFormData={setFormData} />}
      </Grid>

      <Grid size={12}>
        <TextField
          label={t('Description')}
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
};

export default ItemForm;
