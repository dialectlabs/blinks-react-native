import { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, SimpleMarkdown, Text } from '../../components';
import { CheckBoxIcon } from '../../icons';
import type {
  BorderRadiiVars,
  ColorVars,
  DefaultSpacingVars,
} from '../../theme';
import { useTheme } from '../../theme';
import { ActionButton } from '../ActionButton';

import type { InputProps } from '../../types';
import {
  buildDefaultCheckboxGroupDescription,
  getDescriptionColor,
} from './util';

const Checkbox = ({
  selected,
  disabled,
}: {
  selected?: boolean;
  disabled?: boolean;
}) => {
  const theme = useTheme();
  const getBgColor = () => {
    if (!selected) return 'inputBg';
    if (disabled) return 'inputStrokeDisabled';
    return 'inputBgSelected';
  };

  return (
    <Box
      width={16}
      height={16}
      alignItems="center"
      justifyContent="center"
      style={{ borderRadius: 3 }}
      borderWidth={selected ? 0 : 1}
      borderColor={disabled ? 'inputStrokeDisabled' : 'inputStroke'}
      backgroundColor={getBgColor()}
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
  const theme = useTheme();

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

  useEffect(
    () => {
      onValidityChange?.(state.valid);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const extendedChange = (_name: string, value: boolean) => {
    setState((prev) => {
      const newValue = { ...prev.value, [_name]: value };

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
            onPress={
              disabled
                ? undefined
                : () => extendedChange(it.value, !state.value[it.value])
            }
          >
            <Box
              flexDirection="row"
              alignItems="center"
              gap={3}
              minHeight={height}
              py={1.5}
              pl={isStandalone ? 2 : 0}
            >
              <Checkbox selected={state.value[it.value]} disabled={disabled} />
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
          onClick={() => button.onClick({ [name]: normalizedValue })}
          disabled={button.disabled || !normalizedValue.length}
        />
      )}
      {finalDescription && (
        <Text
          color={getDescriptionColor(state.valid, touched)}
          variant="caption"
          {...standaloneProps.text}
        >
          <SimpleMarkdown text={finalDescription} baseTextVariant="caption" />
        </Text>
      )}
    </Box>
  );
};
