import type { PropsWithChildren } from 'react';
import { type Theme, useTheme } from '../theme';
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
  const theme = useTheme();
  const height = theme.spacing.inputHeight;
  return (
    <Box
      justifyContent="center"
      borderRadius={standalone ? 'inputStandalone' : 'input'}
      padding={1.5}
      minHeight={height}
      backgroundColor={disabled ? 'inputBgDisabled' : 'inputBg'}
      borderWidth={1}
      borderColor={disabled ? 'inputStrokeDisabled' : borderColor}
    >
      {children}
    </Box>
  );
};
