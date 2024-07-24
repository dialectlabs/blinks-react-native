import { Box, Text } from '../index';
import { ActivityIndicator } from 'react-native';
import theme from '../theme';
import { CheckIcon } from '../icons';
import { Button } from '../components';
import React from 'react';
import type { ButtonProps } from './types';

const ButtonContent = ({ text, variant, loading, disabled }) => {
  const getTextColor = () => {
    if (disabled && variant !== 'success') {
      return 'text-button-disabled';
    }
    if (!disabled && variant !== 'success') {
      return 'text-button';
    }
    if (variant === 'success') {
      return 'text-button-success';
    }
  };

  const textColor = getTextColor();
  return (
    <Box
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Text variant="text" color={textColor} fontWeight={600} numberOfLines={1}>
        {text}
      </Text>
      {
        loading && <ActivityIndicator color={theme.colors[textColor]} /> //TODO spinner dots?
      }
      {variant === 'success' && <CheckIcon color={theme.colors[textColor]} />}
    </Box>
  );
};

export const ActionButton = ({
  text,
  loading,
  disabled,
  variant,
  onClick,
}: ButtonProps) => {
  return (
    <Button onClick={onClick} disabled={disabled} variant={variant}>
      <ButtonContent text={text} loading={loading} variant={variant} />
    </Button>
  );
};
