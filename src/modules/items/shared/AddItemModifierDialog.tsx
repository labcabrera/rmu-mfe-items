/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Button, Grid } from '@mui/material';
import {
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

  const types = (options || []).map((e) => e.modifierType);

  const onTypeChange = (type: ItemModifierType) => {
    setOption(options?.find((e) => e.modifierType === type));
    setFormData({ ...formData, type });
  };

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
        <Button onClick={() => onAdd(formData)} color="success">
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
        {option && option.allowValue && (
          <Grid size={12}>
            <NumericInput
              value={formData.value}
              label={t('bonus')}
              onChange={(e) => setFormData({ ...formData, value: e })}
            />
          </Grid>
        )}
        {option && option.allowModifier && option.selectorType === '@skill' && (
          <SkillSelector
            onSkillChange={(e) => setFormData({ ...formData, modifier: e })}
            onSpecializationChange={(e) => setFormData({ ...formData, specialization: e })}
            onError={(e) => onError(e)}
          />
        )}
        <Grid size={12}></Grid>
      </Grid>
      <TechnicalInfo>
        <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
        <pre>Option: {JSON.stringify(option, null, 2)}</pre>
        <pre>Options: {JSON.stringify(options, null, 2)}</pre>
      </TechnicalInfo>
    </RmuDialog>
  );
}
