import React from 'react';
import { Pressable } from 'react-native';
import type { Theme } from '../theme';
import { Box, type BoxProps } from './Box';
import { useLinking } from './LinkingProvider';

interface LinkProps {
  url?: string | null;
}

export const Link = ({
  url,
  children,
  ...props
}: LinkProps & BoxProps<Theme> & React.PropsWithChildren) => {
  const { openUrl } = useLinking();

  return (
    <Pressable onPress={() => url && openUrl(url)}>
      <Box {...props}>{children}</Box>
    </Pressable>
  );
};
