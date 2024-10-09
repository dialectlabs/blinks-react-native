import { ActivityIndicator } from 'react-native';
import { Box, Button, Text } from '../components';
import type { ContentProps } from '../components/Button';
import { CheckIcon } from '../icons';
import type { ButtonProps } from '../types';

const ButtonContent = ({ text, color, isSuccess, isLoading }: ContentProps) => (
  <Box flexDirection="row" justifyContent="center" alignItems="center" gap={2}>
    <Text
      variant="text"
      style={{ color }}
      fontWeight={600}
      numberOfLines={1}
      textAlign="center"
    >
      {text}
    </Text>
    {isLoading && <ActivityIndicator color={color} />}
    {isSuccess && <CheckIcon color={color} />}
  </Box>
);

export const ActionButton = ({
  text,
  loading,
  disabled,
  variant,
  ctaType,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      text={text}
      loading={loading}
      ctaType={ctaType}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      Content={ButtonContent}
    />
  );
};
