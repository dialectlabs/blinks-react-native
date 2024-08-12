import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { InputContainer } from '../../components';
import { Box, Text } from '../../index';
import type {
  BorderRadiiVars,
  ColorVars,
  SpacingVars,
} from '../../theme/types';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';

const RadioButton = ({ selected }: { selected?: boolean }) => {
  return (
    <Box
      width={16}
      height={16}
      p={1}
      borderRadius="full"
      borderWidth={selected ? 0 : 1}
      borderColor="inputStroke"
      backgroundColor={selected ? 'inputBgSelected' : 'inputBg'}
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
        backgroundColor: 'bgSecondary' as keyof ColorVars,
        padding: 2 as keyof SpacingVars,
        borderRadius: 'xl' as keyof BorderRadiiVars,
      }
    : {};
  return (
    <Box flexDirection="column" gap={3} {...standaloneProps}>
      {label && (
        <Text
          variant={isStandalone ? 'text' : 'subtext'}
          fontWeight="600"
          color="textPrimary"
          p={isStandalone ? 2 : 0}
          pb={0}
        >
          {label}
          {required ? '*' : ''}
        </Text>
      )}
      {options.map((it) => (
        <InputContainer key={it.value} borderColor="inputStroke">
          <TouchableOpacity
            onPress={disabled ? undefined : () => extendedChange(it.value)}
          >
            <Box pl={2} flexDirection="row" alignItems="center" gap={3}>
              <RadioButton selected={it.value === value} />
              <Text variant="text" color="textInput">
                {it.label}
              </Text>
            </Box>
          </TouchableOpacity>
        </InputContainer>
      ))}
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
          p={isStandalone ? 2 : 0}
          pt={0}
        >
          {description}
        </Text>
      )}
    </Box>
  );
};
