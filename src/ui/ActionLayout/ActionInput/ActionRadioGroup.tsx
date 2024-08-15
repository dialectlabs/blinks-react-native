import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '../../index';
import type {
  BorderRadiiVars,
  ColorVars,
  SpacingVars,
} from '../../theme/types';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';

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
  const isStandalone = !!button;

  const [value, setValue] = useState<string>(
    options.find((option) => option.selected)?.value ?? '',
  );
  const [isValid, setValid] = useState(!isStandalone || !required);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, []);

  const extendedChange = useCallback(
    (value: string) => {
      setValue(value);
      setValid(true);

      onChange?.(value);
      onValidityChange?.(true);
    },
    [onChange],
  );

  const standaloneProps = isStandalone
    ? {
        container: {
          backgroundColor: 'bgSecondary' as keyof ColorVars,
          padding: 2 as keyof SpacingVars,
          borderRadius: 'xl' as keyof BorderRadiiVars,
        },
        text: {
          py: 1 as keyof SpacingVars,
          px: 2 as keyof SpacingVars,
        },
      }
    : {};

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
            key={it.value}
            onPress={disabled ? undefined : () => extendedChange(it.value)}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              gap={3}
              height={40}
              py={1.5}
              pl={isStandalone ? 2 : 0}
            >
              <RadioButton selected={it.value === value} disabled={disabled} />
              <Text variant="text" color="textInput">
                {it.label}
              </Text>
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
