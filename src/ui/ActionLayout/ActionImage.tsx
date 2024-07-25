import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
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
      setAspectRatio(Math.max(width / height, 1));
    });
  }, [imageUrl]);

  return (
    <Link url={websiteUrl} width="100%" aspectRatio={aspectRatio}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: imageUrl,
        }}
      />
    </Link>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
