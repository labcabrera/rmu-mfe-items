import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';

const GenericAvatar: FC<{
  imageUrl: string;
  size?: number;
}> = ({ imageUrl, size = 200 }) => {
  return <Avatar src={imageUrl} sx={{ width: size, height: size }} variant="square" />;
};

export default GenericAvatar;
