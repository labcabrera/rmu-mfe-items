import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AddButton,
  CategorySeparator,
  DataTable,
  DataTableColumn,
  DeleteButton,
  Item,
  ItemModifier,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AddItemModifierDialog from './AddItemModifierDialog';

export default function ItemFormModifiers({
  formData,
  setFormData,
  editable = true,
}: {
  formData: Item;
  setFormData: (item: Item) => void;
  /** Spec 063: without permission on the item, its modifiers cannot be added or removed. */
  editable?: boolean;
}) {
  const { t } = useTranslation();
  const notify = useNotify();
  const [modifierDialogOpen, setModifierDialogOpen] = useState<boolean>(false);

  const onModifierAdded = (modifier: ItemModifier) => {
    setFormData({ ...formData, modifiers: [...(formData.modifiers || []), modifier] });
  };

  const onDelete = (id: string) => {
    setFormData({ ...formData, modifiers: (formData.modifiers || []).filter((e) => e.id !== id) });
  };

  const columns: DataTableColumn<{ modifier: ItemModifier; index: number }>[] = [
    { key: 'type', header: t('type'), render: ({ modifier }) => t(modifier.type) },
    { key: 'bonus', header: t('bonus'), render: ({ modifier }) => modifier.value || '-' },
    {
      key: 'modifier',
      header: t('modifier'),
      render: ({ modifier }) => (modifier.modifier ? t(modifier.modifier) : '-'),
    },
    {
      key: 'spec',
      header: t('spec'),
      render: ({ modifier }) => (modifier.specialization ? t(modifier.specialization) : '-'),
    },
    {
      key: 'actions',
      // The add button lives in the header, so the table stays a table on phones (no cards without header).
      header: editable && <AddButton onClick={() => setModifierDialogOpen(true)} />,
      align: 'right',
      render: ({ modifier }) => editable && <DeleteButton onClick={() => onDelete(modifier.id)} />,
    },
  ];

  return (
    <>
      <CategorySeparator text={t('modifiers')} />
      <DataTable
        columns={columns}
        rows={(formData.modifiers || []).map((modifier, index) => ({ modifier, index }))}
        getKey={({ index }) => String(index)}
        cardsOnMobile={false}
      />
      <AddItemModifierDialog
        open={modifierDialogOpen}
        onAdd={(e) => onModifierAdded(e)}
        onClose={() => setModifierDialogOpen(false)}
        onError={(err) => notify.error(err)}
      />
    </>
  );
}
