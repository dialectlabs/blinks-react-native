import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '../../components';
import {
  type BorderRadiiVars,
  type ColorVars,
  type DefaultSpacingVars,
  useTheme,
} from '../../theme';
import type { InputProps } from '../../types';
import { ActionButton } from '../ActionButton';

const RadioButton = ({
  selected,
  disabled,
}: {
  selected?: boolean;
  disabled?: boolean;
}) => {
  const getBgColor = () => {
    if (!selected) return 'inputBg';
    if (disabled) return 'inputStrokeDisabled';
    return 'inputBgSelected';
  };

  return (
    <Box
      width={16}
      height={16}
      p={1}
      borderRadius="full"
      borderWidth={selected ? 0 : 1}
      borderColor={disabled ? 'inputStrokeDisabled' : 'inputStroke'}
      backgroundColor={getBgColor()}
    >
      {selected && (
        <Box
          borderRadius="full"
          width={8}
          height={8}
          backgroundColor="inputBg"
        />
      )}
    </Box>
  );
};

export const ActionRadioGroup = ({
  placeholder: label,
  name,
  button,
  disabled,
  onChange,
  onValidityChange,
  description,
  options = [],
  required,
}: Omit<InputProps, 'type'> & {
  onChange?: (value: string) => void;
  onValidityChange?: (state: boolean) => void;
}) => {
  const theme = useTheme();
  const isStandalone = !!button;

  const [value, setValue] = useState<string>(
    options.find((option) => option.selected)?.value ?? '',
  );
  const [isValid, setValid] = useState(!isStandalone || !required);

  useEffect(
    () => {
      onValidityChange?.(isValid);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const extendedChange = useCallback(
    (_value: string) => {
      setValue(_value);
      setValid(true);

      onChange?.(_value);
      onValidityChange?.(true);
    },
    [onChange, onValidityChange],
  );

  const standaloneProps = isStandalone
    ? {
        container: {
          backgroundColor: 'bgSecondary' as keyof ColorVars,
          padding: 2 as keyof DefaultSpacingVars,
          borderRadius: 'xl' as keyof BorderRadiiVars,
        },
        text: {
          py: 1 as keyof DefaultSpacingVars,
          px: 2 as keyof DefaultSpacingVars,
        },
      }
    : {};

  const height = theme.spacing.inputHeight;

  return (
    <Box flexDirection="column" gap={1} {...standaloneProps.container}>
      {label && (
        <Text
          variant="subtext"
          fontWeight="600"
          color="textPrimary"
          {...standaloneProps.text}
        >
          {label}
          {required ? '*' : ''}
        </Text>
      )}
      <Box>
        {options.map((it) => (
          <TouchableOpacity
            disabled={disabled}
            key={it.value}
            onPress={disabled ? undefined : () => extendedChange(it.value)}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              gap={3}
              minHeight={height}
              py={1.5}
              pl={isStandalone ? 2 : 0}
            >
              <RadioButton selected={it.value === value} disabled={disabled} />
              <Box flex={1}>
                <Text variant="text" color="textInput">
                  {it.label}
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
      {button && (
        <ActionButton
          {...button}
          onClick={() => button.onClick({ [name]: value })}
          disabled={button.disabled || !value || !isValid}
        />
      )}
      {description && (
        <Text
          color={!isValid ? 'textError' : 'textSecondary'}
          variant="caption"
          {...standaloneProps.text}
        >
          {description}
        </Text>
      )}
    </Box>
  );
};
