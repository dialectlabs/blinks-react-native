import { useState } from 'react';
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
  //TODO what should initial aspect ratio be?
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  return (
    <Link url={websiteUrl} width="100%" aspectRatio={aspectRatio}>
      {imageUrl.endsWith('svg') ? (
        <SvgUri style={styles.image} uri={imageUrl} />
      ) : (
        <Image
          onLoad={({ nativeEvent: { source } }) =>
            setAspectRatio(Math.max(source.width / source.height, 1))
          }
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
