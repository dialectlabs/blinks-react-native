import type { PropsWithChildren } from 'react';
import type { Theme } from '../theme';
import { Box } from './Box';

export const InputContainer = ({
  children,
  disabled = false,
  standalone = false,
  borderColor,
}: {
  standalone?: boolean;
  disabled?: boolean;
  borderColor: keyof Theme['colors'];
} & PropsWithChildren) => {
  return (
    <Box
      justifyContent="center"
      borderRadius={standalone ? 'inputStandalone' : 'input'}
      padding={1.5}
      minHeight={40}
      backgroundColor={disabled ? 'inputBgDisabled' : 'inputBg'}
      borderWidth={1}
      borderColor={disabled ? 'inputStrokeDisabled' : borderColor}
    >
      {children}
    </Box>
  );
};
