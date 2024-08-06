import { useCallback, useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { InputContainer } from '../../components';
import { CheckBoxIcon } from '../../icons';
import { Box, Text } from '../../index';
import { useTheme } from '../../theme';
import type { InputProps } from '../types';

const Checkbox = ({ selected }: { selected?: boolean }) => {
  const theme = useTheme();
  return (
    <Box
      width={16}
      height={16}
      alignItems="center"
      justifyContent="center"
      style={{ borderRadius: 3 }}
      borderWidth={selected ? 0 : 1}
      borderColor="inputStroke"
      backgroundColor={selected ? 'inputStrokeSelected' : 'inputBg'} //TODO bg token
    >
      {selected && <CheckBoxIcon color={theme.colors.inputBg} />}
    </Box>
  );
};
const validate = (
  values: string[],
  { required, min, max }: { required?: boolean; min?: number; max?: number },
) => {
  if (required && !values.length) {
    return false;
  }

  if (min && values.length < min) {
    return false;
  }

  if (max && values.length > max) {
    return false;
  }

  return true;
};

const defaultDescription = ({ min, max }: { min?: number; max?: number }) => {
  if (min && max) return `Select between ${min} and ${max} options`;
  if (min) return `Select minimum ${min} options`;
  if (max) return `Select maximum ${max} options`;
  return null;
};
export const ActionCheckboxGroup = ({
  placeholder: label,
  button,
  disabled,
  onChange,
  onValidityChange,
  min,
  max,
  description,
  options = [],
  required,
}: Omit<InputProps, 'type'> & {
  onChange?: (value: string[]) => void;
  onValidityChange?: (state: boolean) => void;
}) => {
  const minChoices = min as number;
  const maxChoices = max as number;
  const isStandalone = !!button;

  const finalDescription =
    description ||
    defaultDescription({
      min: minChoices,
      max: maxChoices,
    });

  const [value, setValue] = useState<Record<string, boolean>>(
    Object.fromEntries(
      options.map((option) => [option.value, option.selected ?? false]),
    ),
  );
  const normalizedValue = useMemo(
    () =>
      Object.entries(value)
        .filter(([, v]) => v)
        .map(([k]) => k),
    [value],
  );
  const [isValid, setValid] = useState(!isStandalone || !required);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    onChange?.(normalizedValue);
  }, [onChange, normalizedValue]);

  useEffect(() => {
    const validity = validate(normalizedValue, {
      required: isStandalone,
      min: minChoices,
      max: maxChoices,
    });

    setValid(validity);
    onValidityChange?.(validity);
  }, [isStandalone, maxChoices, minChoices, normalizedValue, onValidityChange]);

  const extendedChange = useCallback((name: string, value: boolean) => {
    setValue((prev) => ({ ...prev, [name]: value }));
    setTouched(true);
  }, []);

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
            onPress={
              disabled
                ? undefined
                : () => extendedChange(it.value, !value[it.value])
            }
          >
            <Box pl={2} flexDirection="row" alignItems="center" gap={3}>
              <Checkbox selected={value[it.value]} />
              <Text variant="text" color="textInput">
                {it.label}
              </Text>
            </Box>
          </TouchableOpacity>
        </InputContainer>
      ))}
      {finalDescription && (
        <Text
          color={touched && !isValid ? 'textError' : 'textSecondary'}
          variant="caption"
        >
          {finalDescription}
        </Text>
      )}
    </Box>
    //TODO add button
  );
};
