import { Link } from '../components';
import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';

export const ActionImage = ({
  imageUrl,
  websiteUrl,
}: {
  imageUrl: string;
  websiteUrl?: string | null;
}) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    Image.getSize(imageUrl, (width, height) => {
      setAspectRatio(Math.max(width / height, 1));
    });
  }, [imageUrl]);

  return (
    <Link url={websiteUrl}>
      <Image
        style={{
          width: '100%',
          aspectRatio: aspectRatio,
        }}
        resizeMode="cover"
        aspectRatio={aspectRatio}
        source={{
          uri: imageUrl,
        }}
      />
    </Link>
  );
};
