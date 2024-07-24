import { Box, BoxProps } from '../index';
import { Theme } from '../theme';
import React from 'react';
import { Linking } from 'react-native';

interface LinkProps {
  url?: string | null;
}

export const Link = ({
  url,
  children,
  ...props
}: LinkProps & BoxProps<Theme> & React.PropsWithChildren) => (
  <Box {...props} onClick={() => url && Linking.openURL(url)}>
    {children}
  </Box>
);
