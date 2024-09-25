import React from 'react';
import { Linking, Pressable } from 'react-native';
import type { Theme } from '../theme';
import { Box, type BoxProps } from './Box';

interface LinkProps {
  url?: string | null;
}

export const Link = ({
  url,
  children,
  ...props
}: LinkProps & BoxProps<Theme> & React.PropsWithChildren) => (
  <Pressable onPress={() => url && Linking.openURL(url)}>
    <Box {...props}>{children}</Box>
  </Pressable>
);
