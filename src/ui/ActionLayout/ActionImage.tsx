import { Link } from '../components';
import { Image } from 'react-native';
import { useEffect, useState } from 'react';

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
    <Link url={websiteUrl} width='100%' aspectRatio={aspectRatio}>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
        source={{
          uri: imageUrl,
        }}
      />
    </Link>
  );
};
