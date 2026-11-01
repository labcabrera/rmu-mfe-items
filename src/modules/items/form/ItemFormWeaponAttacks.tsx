import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AddButton,
  DataTable,
  DataTableColumn,
  DeleteButton,
  Item,
  WeaponMode,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AddAttackModeDialog from './AddAttackModeDialog';

type ModeRow = { mode: WeaponMode; index: number };

const ItemFormWeaponAttacks: FC<{
  formData: Item;
  setFormData: (item: Item) => void;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const onModeAdded = (mode: WeaponMode) => {
    setFormData({ ...formData, weapon: { ...formData.weapon!, modes: [...formData.weapon!.modes!, mode] } });
  };

  const onDeleted = (index: number) => {
    setFormData({
      ...formData,
      weapon: { ...formData.weapon!, modes: formData.weapon!.modes!.filter((_, i) => i !== index) },
    });
  };

  const columns: DataTableColumn<ModeRow>[] = [
    { key: 'type', header: t('type'), render: ({ mode }) => t(mode.type) },
    { key: 'types', header: t('types'), render: ({ mode }) => mode.attackTypes.map((e) => t(e)).join(', ') },
    { key: 'attack-table', header: t('attack-table'), render: ({ mode }) => t(mode.attackTable) },
    { key: 'fumble-table', header: t('fumble-table'), render: ({ mode }) => t(mode.fumbleTable) },
    { key: 'size', header: t('size-adjustment'), align: 'right', render: ({ mode }) => mode.sizeAdjustment },
    { key: 'ob', header: t('ob-modifier'), align: 'right', render: ({ mode }) => mode.obModifier ?? '-' },
    {
      key: 'actions',
      // The add button lives in the header, so the table stays a table on phones (no cards without header).
      header: <AddButton onClick={() => setOpen(true)} />,
      align: 'right',
      render: ({ index }) => <DeleteButton onClick={() => onDeleted(index)} />,
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        rows={formData.weapon!.modes!.map((mode, index) => ({ mode, index }))}
        getKey={({ index }) => String(index)}
        cardsOnMobile={false}
      />
      <AddAttackModeDialog open={open} onClose={() => setOpen(false)} onModeAdded={(mode) => onModeAdded(mode)} />
    </>
  );
};

export default ItemFormWeaponAttacks;
