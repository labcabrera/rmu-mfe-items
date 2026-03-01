import React, { FC } from 'react';
import { t } from 'i18next';
import { Item } from '../../api/item.dto';
import CardListItem from './CardListItem';

const imageBaseUrl = process.env.RMU_MFE_ASSETS!;

const ItemCard: FC<{
  item: Item;
  onClick?: () => void;
}> = ({ item, onClick }) => {
  return (
    <CardListItem
      title={t(item.id)}
      subtitle={t(item.category)}
      image={item.imageUrl || `${imageBaseUrl}images/items/${item.id}.png`}
      onClick={onClick}
    />
  );
};

export default ItemCard;
