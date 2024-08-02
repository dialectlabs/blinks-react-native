import type { PropsWithChildren } from 'react';
import { Box } from '../index';
import type { Theme } from '../theme';

export const InputContainer = ({
  children,
  borderColor,
}: { borderColor: keyof Theme['colors'] } & PropsWithChildren) => {
  return (
    <Box
      justifyContent="center"
      borderRadius="input"
      padding={1.5}
      minHeight={40}
      backgroundColor="inputBg"
      borderWidth={1}
      borderColor={borderColor}
    >
      {children}
    </Box>
  );
};
