import type { TextProps } from '@shopify/restyle';
import React from 'react';
import { Pressable } from 'react-native';
import type { Theme } from '../theme';
import { useLinking } from './LinkingProvider';
import { Text } from './Text';

interface LinkProps {
  url?: string | null;
}

export const LinkText = ({
  url,
  children,
  ...props
}: LinkProps & TextProps<Theme> & React.PropsWithChildren) => {
  const { openUrl } = useLinking();

  return (
    <Pressable onPress={() => url && openUrl(url)}>
      <Text {...props}>{children}</Text>
    </Pressable>
  );
};
