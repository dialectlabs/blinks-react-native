import { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { InputContainer } from '../../components';
import { Box, Text } from '../../index';
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
      backgroundColor={selected ? 'inputStrokeSelected' : 'inputBg'} //TODO bg token
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
  //TODO add button

  const isStandalone = !!button;

  const [value, setValue] = useState<string>(
    options.find((option) => option.selected)?.value ?? '',
  );
  const [isValid, setValid] = useState(!isStandalone || !required);
  const [touched, setTouched] = useState(false);

  const extendedChange = useCallback(
    (value: string) => {
      setValue(value);
      setValid(true);
      setTouched(true);

      onChange?.(value);
      onValidityChange?.(true);
    },
    [onChange, onValidityChange],
  );

  return (
    <Box flexDirection="column" gap={3}>
      {label && (
        <Text variant="subtext" fontWeight="600" color="textPrimary">
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
      {description && (
        <Text
          color={touched && !isValid ? 'textError' : 'textSecondary'}
          variant="caption"
        >
          {description}
        </Text>
      )}
    </Box>
  );
};
