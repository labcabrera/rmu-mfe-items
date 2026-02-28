import React, { FC } from 'react';
import { t } from 'i18next';
import { Item } from '../../api/item.dto';
import CardListItem from './CardListItem';

const ItemCard: FC<{
  item: Item;
  onClick?: () => void;
}> = ({ item, onClick }) => {
  return (
    <CardListItem
      title={item.id}
      subtitle={t(item.category)}
      image={item.id || '/static/images/items/unknown.png'}
      onClick={onClick}
    />
  );
};

export default ItemCard;
