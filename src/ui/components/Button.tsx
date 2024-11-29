import React from 'react';
import { TouchableOpacity } from 'react-native';
import { DeepLinkIcon } from '../icons';
import { useTheme } from '../theme';
import type { ButtonProps } from '../types';
import { Box } from './Box';

export interface ContentProps {
  text: string | null;
  color: string;
  isLoading?: boolean;
  isSuccess?: boolean;
}

export const Button = ({
  onClick,
  disabled,
  variant = 'default',
  ctaType = 'button',
  text,
  loading,
  Content,
}: Omit<ButtonProps, 'onClick'> & {
  onClick: () => void;
  Content: (props: ContentProps) => React.ReactElement;
}) => {
  const theme = useTheme();
  const getBgColor = () => {
    if (variant === 'success') return 'buttonSuccess';
    if (disabled) return 'buttonDisabled';
    return 'button';
  };
  const getTextColor = () => {
    if (variant === 'success') return theme.colors.textButtonSuccess;
    if (disabled) return theme.colors.textButtonDisabled;
    return theme.colors.textButton;
  };

  const bgColor = getBgColor();
  const textColor = getTextColor();
  const height = theme.spacing.inputHeight;

  const isLink = ctaType === 'link';
  return (
    <TouchableOpacity activeOpacity={0.7} disabled={disabled} onPress={onClick}>
      <Box
        height={height}
        px={isLink ? 5 : 4}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderRadius="button"
        backgroundColor={bgColor}
      >
        <Content
          text={text}
          color={textColor}
          isLoading={loading}
          isSuccess={variant === 'success'}
        />
        {isLink && (
          <Box position="absolute" top={8} right={8}>
            <DeepLinkIcon height={10} width={10} color={textColor} />
          </Box>
        )}
      </Box>
    </TouchableOpacity>
  );
};
