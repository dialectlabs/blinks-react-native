import { type JSX, useCallback, useEffect, useMemo, useState } from 'react';
import {
  type InputModeOptions,
  type NativeSyntheticEvent,
  TextInput,
  type TextInputChangeEventData,
} from 'react-native';
import type { SvgProps } from 'react-native-svg';
import { Box, InputContainer, Text } from '../../components';
import { EnvelopeIcon, LinkIcon } from '../../icons';
import { useTheme } from '../../theme';
import type { InputProps } from '../../types';
import { ActionButton } from '../ActionButton';
import {
  buildDefaultTextDescription,
  getBorderColor,
  getDescriptionColor,
} from './util';

const inputVariants: Record<
  TextType,
  {
    placeholder: string;
    inputMode: InputModeOptions;
    icon?: (props: SvgProps) => JSX.Element;
    pattern?: RegExp;
  }
> = {
  email: {
    placeholder: 'hello@example.com',
    inputMode: 'email',
    icon: EnvelopeIcon,
    pattern: new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'),
  },
  url: {
    placeholder: 'https://',
    inputMode: 'url',
    icon: LinkIcon,
    pattern: new RegExp(
      'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~=]{1,2048}\\.[a-zA-Z0-9()]{1,20}\\b([-a-zA-Z0-9()@:%_+.~#?&/\\[\\]=]*)',
    ),
  },
  text: {
    placeholder: 'Type here...',
    inputMode: 'text',
  },
  textarea: {
    placeholder: 'Type here...',
    inputMode: 'text',
  },
};

const TextTypes = ['text', 'email', 'url', 'textarea'];
type TextType = 'text' | 'email' | 'url' | 'textarea';

export const ActionTextInput = ({
  placeholder,
  name,
  button,
  disabled,
  onChange,
  onValidityChange,
  pattern,
  min,
  max,
  type: inputType,
  description,
  required,
  icon,
}: InputProps & {
  onChange?: (value: string) => void;
  onValidityChange?: (state: boolean) => void;
  icon?: (props: SvgProps) => JSX.Element;
}) => {
  const theme = useTheme();
  const type = (TextTypes.includes(inputType) ? inputType : 'text') as TextType;

  const isStandalone = !!button;
  const [value, setValue] = useState('');

  const [isValid, setValid] = useState(!isStandalone && !required);
  const [isTouched, setTouched] = useState(false);

  const regExp = useMemo(
    () => (pattern ? new RegExp(pattern) : inputVariants[type].pattern),
    [pattern, type],
  );
  const minLength = min as number;
  const maxLength = max as number;

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
      if (minLength && text.length < minLength) {
        return false;
      }
      if (maxLength && text.length > maxLength) return false;
      if (regExp) {
        return regExp.test(text);
      }
      return true;
    },
    [minLength, maxLength, regExp, required],
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
    (placeholder ?? inputVariants[type].placeholder) + (required ? '*' : '');

  const [isFocused, setIsFocused] = useState(false);
  const InputIcon = icon ?? inputVariants[type].icon;

  const finalDescription =
    description ??
    buildDefaultTextDescription({ min: minLength, max: maxLength });

  const isTextArea = type === 'textarea';
  return (
    <Box flexDirection="column" gap={1}>
      <InputContainer
        disabled={disabled}
        standalone={isStandalone}
        borderColor={getBorderColor(isValid, isTouched, isFocused)}
      >
        <Box alignItems="center" flexDirection="row" pl={2} pr={1} gap={1.5}>
          {InputIcon && (
            <InputIcon
              width={16}
              height={16}
              color={theme.colors.iconPrimary}
            />
          )}
          <TextInput
            inputMode={pattern ? 'text' : inputVariants[type]?.inputMode}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              flex: 1,
              verticalAlign: isTextArea ? 'top' : 'auto',
              fontSize: theme.textVariants.text.fontSize,
              lineHeight: theme.textVariants.text.lineHeight,
              height: isTextArea ? 66 : isStandalone ? 40 : undefined,
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
            multiline={isTextArea}
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
