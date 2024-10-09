import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Link } from '../components';

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
      if (width !== 0 && height !== 0) {
        setAspectRatio(Math.max(width / height, 1));
      }
    });
  }, [imageUrl]);

  return (
    <Link url={websiteUrl} width="100%" aspectRatio={aspectRatio}>
      {imageUrl.endsWith('svg') ? (
        <SvgUri style={styles.image} uri={imageUrl} />
      ) : (
        <Image
          style={styles.image}
          resizeMode="cover"
          src={imageUrl}
          source={{
            uri: imageUrl,
          }}
        />
      )}
    </Link>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
