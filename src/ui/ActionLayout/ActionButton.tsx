import { ActivityIndicator } from 'react-native';
import { Button } from '../components';
import { CheckIcon } from '../icons';
import { Box, Text } from '../index';
import { useTheme } from '../theme';
import type { ButtonProps } from './types';

const ButtonContent = ({
  text,
  variant,
  loading,
  disabled,
}: Omit<ButtonProps, 'onClick'>) => {
  const theme = useTheme();
  const getTextColor = () => {
    if (variant === 'success') {
      return 'textButtonSuccess';
    }
    if (disabled) {
      return 'textButtonDisabled';
    }
    return 'textButton';
  };

  const textColor = getTextColor();
  return (
    <Box
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Text
        variant="text"
        color={textColor}
        fontWeight={600}
        numberOfLines={1}
        textAlign="center"
      >
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
      <ButtonContent
        text={text}
        loading={loading}
        variant={variant}
        disabled={disabled}
      />
    </Button>
  );
};
