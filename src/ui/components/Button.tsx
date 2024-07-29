import React from 'react';
import { TouchableOpacity } from 'react-native';
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
    <TouchableOpacity activeOpacity={0.7} disabled={disabled} onPress={onClick}>
      <Box
        style={{ paddingVertical: 11 }}
        px={4}
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderRadius="button"
        backgroundColor={getBgColor()}
      >
        {children}
      </Box>
    </TouchableOpacity>
  );
};
