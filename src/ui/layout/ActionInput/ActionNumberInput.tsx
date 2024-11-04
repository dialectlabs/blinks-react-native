import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type NativeSyntheticEvent,
  TextInput,
  type TextInputChangeEventData,
} from 'react-native';
import { Box, InputContainer, Text } from '../../components';
import NumberIcon from '../../icons/NumberIcon';
import { useTheme } from '../../theme';
import type { InputProps } from '../../types';
import { ActionButton } from '../ActionButton';
import {
  buildDefaultNumberDescription,
  getBorderColor,
  getDescriptionColor,
} from './util';

export const ActionNumberInput = ({
  placeholder,
  name,
  button,
  disabled,
  onChange,
  onValidityChange,
  pattern,
  min,
  max,
  description,
  required,
}: InputProps & {
  onChange?: (value: string) => void;
  onValidityChange?: (state: boolean) => void;
}) => {
  const theme = useTheme();

  const isStandalone = !!button;
  const [value, setValue] = useState('');
  const [isValid, setValid] = useState(!isStandalone && !required);
  const [isTouched, setTouched] = useState(false);

  const regExp = useMemo(
    () => (pattern ? new RegExp(pattern) : null),
    [pattern],
  );
  const minNumber = min as number;
  const maxNumber = max as number;

  useEffect(
    () => {
      onValidityChange?.(isValid);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const checkValidity = useCallback(
    (text: string) => {
      if (!text) {
        return !required;
      }
      if (regExp) {
        return regExp.test(text);
      }
      const textNumber = parseFloat(text);
      if (isNaN(textNumber)) return false;
      if (minNumber && textNumber < minNumber) {
        return false;
      }
      if (maxNumber && textNumber > maxNumber) {
        return false;
      }
      return true;
    },
    [regExp, minNumber, maxNumber, required],
  );

  const extendedChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setTouched(true);
    const _value = e.nativeEvent.text;
    const validity = checkValidity(_value);

    setValue(_value);
    setValid(validity);

    onChange?.(_value);
    onValidityChange?.(validity);
  };

  const placeholderWithRequired =
    (placeholder || 'Type here...') + (required ? '*' : '');
  const finalDescription =
    description ??
    buildDefaultNumberDescription({ min: minNumber, max: maxNumber });

  const [isFocused, setIsFocused] = useState(false);
  const height = theme.spacing.inputHeight;
  return (
    <Box flexDirection="column" gap={1}>
      <InputContainer
        standalone={isStandalone}
        disabled={disabled}
        borderColor={getBorderColor(isValid, isTouched, isFocused)}
      >
        <Box alignItems="center" flexDirection="row" pl={2} pr={1} gap={1.5}>
          <NumberIcon width={16} height={16} color={theme.colors.iconPrimary} />
          <TextInput
            inputMode={pattern ? 'text' : 'numeric'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              flex: 1,
              fontSize: theme.textVariants.text.fontSize,
              lineHeight: theme.textVariants.text.lineHeight,
              height: isStandalone ? height : undefined,
              color: disabled
                ? theme.colors.textInputDisabled
                : theme.colors.textInput,
            }}
            placeholderTextColor={
              disabled
                ? theme.colors.textInputDisabled
                : theme.colors.textInputPlaceholder
            }
            placeholder={placeholderWithRequired}
            value={value}
            readOnly={disabled}
            onChange={extendedChange}
          />
        </Box>
        {button && (
          <Box mt={1.5}>
            <ActionButton
              {...button}
              onClick={() => button.onClick?.({ [name]: value })}
              disabled={button.disabled || value === '' || !isValid}
            />
          </Box>
        )}
      </InputContainer>
      {finalDescription && (
        <Text
          color={getDescriptionColor(isValid, isTouched)}
          variant="caption"
          py={1}
        >
          {finalDescription}
        </Text>
      )}
    </Box>
  );
};
