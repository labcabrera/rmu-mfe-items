/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Button, Grid } from '@mui/material';
import {
  fetchEnumerations,
  fetchItemModifierOptions,
  ItemModifier,
  ItemModifierOption,
  ItemModifierType,
  NumericInput,
  RmuDialog,
  RmuSelect,
  SkillSelector,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const ENUM_PREFIX = '@enumeration:';

export default function AddItemModifierDialog({
  open,
  onAdd,
  onClose,
  onError,
}: {
  open: boolean;
  onAdd: (mode: ItemModifier) => void;
  onClose: () => void;
  onError: (err: string) => void;
}) {
  const auth = useAuth();
  const { t } = useTranslation();
  const [options, setOptions] = useState<ItemModifierOption[]>();
  const [option, setOption] = useState<ItemModifierOption>();
  const [formData, setFormData] = useState<ItemModifier>({ id: crypto.randomUUID() } as ItemModifier);
  const [modifierOptions, setModifierOptions] = useState<string[]>();
  const [validForm, setValidForm] = useState<boolean>(false);

  const types = (options || []).map((e) => e.modifierType);

  const onTypeChange = (type: ItemModifierType) => {
    const option = options?.find((e) => e.modifierType === type);
    setOption(option);
    setFormData({ id: crypto.randomUUID(), type: type } as ItemModifier);
    if (option?.selectorType?.startsWith(ENUM_PREFIX)) {
      const enumName = option.selectorType.substring(ENUM_PREFIX.length);
      fetchEnumerations(`category==${enumName}`, 0, 1000, auth)
        .then((response) => response.content)
        .then((e) => e.map((e) => e.key))
        .then((e) => setModifierOptions(e))
        .catch((err) => onError(err.message));
    }
  };

  const onClickAdd = () => {
    onAdd(formData);
    onClose();
    setFormData({ id: crypto.randomUUID() } as ItemModifier);
  };

  const isValidForm = () => {
    if (!option || !formData || !formData.type) return false;
    if (option.value === 'forbidden' && formData.value) return false;
    if (option.value === 'required' && !formData.value) return false;
    if (option.modifier === 'required' && !formData.modifier) return false;
    if (option.modifier === 'forbidden' && formData.modifier) return false;
    if (option.specialization === 'required' && !formData.specialization) return false;
    if (option.specialization === 'forbidden' && formData.specialization) return false;
    return true;
  };

  useEffect(() => {
    setValidForm(isValidForm());
  }, [formData]);

  useEffect(() => {
    fetchItemModifierOptions(auth).then((response) => setOptions(response));
  }, []);

  if (!types) return;

  return (
    <RmuDialog
      title={t('add-modifier')}
      open={open}
      buttons={[
        <Button onClick={onClose}>{t('close')}</Button>,
        <Button color="success" disabled={!validForm} onClick={() => onClickAdd()}>
          {t('add')}
        </Button>,
      ]}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <RmuSelect
            value={formData.type}
            label={t('type')}
            options={types}
            onChange={(e) => onTypeChange(e as ItemModifierType)}
          />
        </Grid>
        {option && option.value !== 'forbidden' && (
          <Grid size={12}>
            <NumericInput
              value={formData.value}
              label={t('bonus')}
              onChange={(e) => setFormData({ ...formData, value: e })}
            />
          </Grid>
        )}
        {option && option.modifier !== 'forbidden' && option.selectorType === '@skill' && (
          <SkillSelector
            onSkillChange={(e) => setFormData({ ...formData, modifier: e })}
            onSpecializationChange={(e) => setFormData({ ...formData, specialization: e })}
            onError={(e) => onError(e)}
          />
        )}
        {option && modifierOptions && (
          <RmuSelect
            value={formData.modifier || ''}
            label={t('modifier')}
            options={modifierOptions}
            onChange={(e) => setFormData({ ...formData, modifier: e })}
          />
        )}
      </Grid>
      <TechnicalInfo>
        <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
        <pre>Option: {JSON.stringify(option, null, 2)}</pre>
        <pre>Options: {JSON.stringify(options, null, 2)}</pre>
      </TechnicalInfo>
    </RmuDialog>
  );
}
