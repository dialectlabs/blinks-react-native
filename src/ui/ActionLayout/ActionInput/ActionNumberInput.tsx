import { useCallback, useState } from 'react';
import {
  type NativeSyntheticEvent,
  TextInput,
  type TextInputChangeEventData,
} from 'react-native';
import { InputContainer } from '../../components';
import NumberIcon from '../../icons/NumberIcon';
import { Box, Text } from '../../index';
import { useTheme } from '../../theme';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';
import { buildDefaultNumberDescription } from './util';

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
  const [isValid, setValid] = useState(true);
  // const [isValid, setValid] = useState(!isStandalone && !required);

  const regExp = pattern ? new RegExp(pattern) : null;
  const minNumber = min as number;
  const maxNumber = max as number;

  const checkValidity = useCallback(
    (text: string) => {
      if (!text && required) return false;
      if (regExp) {
        return regExp.test(text);
      }
      const textNumber = parseFloat(text);
      if (isNaN(textNumber)) return false;
      console.log(textNumber);
      if (minNumber && textNumber < minNumber) {
        return false;
      }
      if (maxNumber && textNumber > maxNumber) {
        return false;
      }
      return true;
    },
    [min, max, regExp, required],
  );

  const extendedChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = e.nativeEvent.text;
    const validity = checkValidity(value);

    setValue(value);
    setValid(validity);

    onChange?.(value);
    onValidityChange?.(validity);
  };

  const placeholderWithRequired =
    (placeholder || 'Type here...') + (required ? '*' : '');
  const finalDescription =
    description ??
    buildDefaultNumberDescription({ min: minNumber, max: maxNumber });

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box flexDirection="column" gap={3}>
      <InputContainer
        borderColor={
          isFocused
            ? 'inputStrokeSelected'
            : isValid
              ? 'inputStroke'
              : 'inputStrokeError'
        }
      >
        <Box alignItems="center" flexDirection="row" pl={2} pr={1} gap={1.5}>
          <NumberIcon width={16} height={16} color={theme.colors.iconPrimary} />
          <TextInput
            keyboardType="numeric"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              fontSize: theme.textVariants.text.fontSize,
              lineHeight: theme.textVariants.text.lineHeight,
              height: isStandalone ? 40 : undefined,
              width: '100%',
              paddingVertical: isStandalone ? 10 : 5,
              color: disabled
                ? theme.colors.textInputDisabled
                : theme.colors.textInput,
            }}
            placeholderTextColor={theme.colors.textInputPlaceholder}
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
          color={!isValid ? 'textError' : 'textSecondary'}
          variant="caption"
        >
          {finalDescription}
        </Text>
      )}
    </Box>
  );
};
