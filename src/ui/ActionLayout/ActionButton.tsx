import { Box, Text } from '../index';
import { ActivityIndicator } from 'react-native';
import { CheckIcon } from '../icons';
import { Button } from '../components';
import React from 'react';
import type { ButtonProps } from './types';
import { useTheme } from '../theme';

const ButtonContent = ({ text, variant, loading, disabled }) => {
  const theme = useTheme();
  const getTextColor = () => {
    if (disabled && variant !== 'success') {
      return 'textButtonDisabled';
    }
    if (!disabled && variant !== 'success') {
      return 'textButton';
    }
    if (variant === 'success') {
      return 'textButtonSuccess';
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
