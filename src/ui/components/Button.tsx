import React from 'react';
import { Pressable } from 'react-native';
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
} & React.PropsWithChildren) => {
  function getBgColor() {
    if (variant === 'success') return 'buttonSuccess';
    if (disabled) return 'buttonDisabled';
    return 'button';
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
