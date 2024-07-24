import { Pressable } from 'react-native';
import type { ComponentProps } from 'react';
import { Box } from '../index';

export const Button = ({
  onClick,
  disabled,
  variant = 'default',
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'success' | 'error' | 'default';
} & ComponentProps<typeof Pressable>) => {
  function getBgColor() {
    if (disabled && variant !== 'success') return 'button-disabled';
    if (!disabled && variant !== 'success') return 'button';
    if (variant === 'success') return 'button-success';
  }
  return (
    <Pressable disabled={disabled} onPress={onClick}>
      <Box
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        px={4}
        py={3}
        borderRadius="button"
        backgroundColor={getBgColor()}
      >
        {children}
      </Box>
    </Pressable>
  );
};
