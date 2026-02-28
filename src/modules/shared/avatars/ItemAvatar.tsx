import React, { FC, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useError } from '../../../ErrorContext';
import { updateItem } from '../../api/item';
import { Item } from '../../api/item.dto';
import { imageBaseUrl } from '../../services/config';
import { getGenericImages } from '../../services/image-service';
import ImageSelectorDialog from '../images/ImageSelectorDialog';

const ItemAvatar: FC<{
  item: Item;
  size?: number;
  enableImageChange?: boolean;
  onItemUpdated?: (item: Item) => void;
}> = ({ item, size = 300, enableImageChange = true, onItemUpdated }) => {
  const { showError } = useError();
  const [dialogOpen, setDialogOpen] = useState(false);

  const onUpdateImage = (imageUrl: string) => {
    const update = {
      imageUrl: imageUrl,
    };
    updateItem(item.id, update)
      .then((data) => {
        if (onItemUpdated) {
          onItemUpdated(data);
        }
        setDialogOpen(false);
      })
      .catch((err) => showError(err.message));
  };

  if (!item) return <p>Loading Item...</p>;

  return (
    <>
      <Avatar
        src={item.imageUrl || `${imageBaseUrl}images/items/${item.id}.png`}
        onClick={() => enableImageChange && setDialogOpen(true)}
        variant="square"
        sx={{
          width: size,
          height: size,
          cursor: enableImageChange ? 'pointer' : 'default',
        }}
      />
      <ImageSelectorDialog
        open={dialogOpen}
        images={getGenericImages()}
        onClose={() => setDialogOpen(false)}
        onSelect={(image) => onUpdateImage(image)}
      />
    </>
  );
};

export default ItemAvatar;
