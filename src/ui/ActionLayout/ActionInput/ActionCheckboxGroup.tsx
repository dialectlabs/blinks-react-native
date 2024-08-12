import { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { InputContainer } from '../../components';
import { CheckBoxIcon } from '../../icons';
import { Box, Text } from '../../index';
import { useTheme } from '../../theme';
import type {
  BorderRadiiVars,
  ColorVars,
  SpacingVars,
} from '../../theme/types';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';
import {
  buildDefaultCheckboxGroupDescription,
  getDescriptionColor,
} from './util';

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
      backgroundColor={selected ? 'inputBgSelected' : 'inputBg'}
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
const normalizeValue = (value: Record<string, boolean>) => {
  return Object.entries(value)
    .filter(([, v]) => v)
    .map(([k]) => k);
};

export const ActionCheckboxGroup = ({
  placeholder: label,
  name,
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
  const hasInitiallySelectedOption = useMemo(
    () => options.find((option) => option.selected),
    [options],
  );

  const finalDescription =
    description ||
    buildDefaultCheckboxGroupDescription({
      min: minChoices,
      max: maxChoices,
    });

  const [state, setState] = useState<{
    value: Record<string, boolean>;
    valid: boolean;
  }>({
    value: Object.fromEntries(
      options.map((option) => [option.value, option.selected ?? false]),
    ),
    valid: isStandalone
      ? !!hasInitiallySelectedOption
      : !(required && !hasInitiallySelectedOption),
  });

  const [touched, setTouched] = useState(false);

  useEffect(() => {
    onValidityChange?.(state.valid);
  }, []);

  const extendedChange = (name: string, value: boolean) => {
    setState((prev) => {
      const newValue = { ...prev.value, [name]: value };

      const normalizedValue = normalizeValue(newValue);
      onChange?.(normalizedValue);

      const validity = validate(normalizedValue, {
        required: isStandalone,
        min: minChoices,
        max: maxChoices,
      });

      onValidityChange?.(validity);

      return {
        value: newValue,
        valid: validity,
      };
    });
    setTouched(true);
  };

  const normalizedValue = useMemo(
    () => normalizeValue(state.value),
    [state.value],
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
            onPress={
              disabled
                ? undefined
                : () => extendedChange(it.value, !state.value[it.value])
            }
          >
            <Box pl={2} flexDirection="row" alignItems="center" gap={3}>
              <Checkbox selected={state.value[it.value]} />
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
          onClick={() => button.onClick({ [name]: normalizedValue })}
          disabled={button.disabled || !normalizedValue.length}
        />
      )}
      {finalDescription && (
        <Text
          color={getDescriptionColor(state.valid, touched)}
          variant="caption"
          pt={0}
          p={isStandalone ? 2 : 0}
        >
          {finalDescription}
        </Text>
      )}
    </Box>
  );
};
