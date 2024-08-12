import { type JSX, useCallback, useEffect, useState } from 'react';
import {
  type KeyboardTypeOptions,
  type NativeSyntheticEvent,
  TextInput,
  type TextInputChangeEventData,
} from 'react-native';
import type { SvgProps } from 'react-native-svg';
import { InputContainer } from '../../components';
import { EnvelopeIcon, LinkIcon } from '../../icons';
import { Box, Text } from '../../index';
import { useTheme } from '../../theme';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';
import {
  buildDefaultTextDescription,
  getBorderColor,
  getDescriptionColor,
} from './util';

const inputVariants: Record<
  TextType,
  {
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
    icon?: (props: SvgProps) => JSX.Element;
  }
> = {
  email: {
    placeholder: 'hello@example.com',
    keyboardType: 'email-address',
    icon: EnvelopeIcon,
  },
  url: {
    placeholder: 'https://',
    keyboardType: 'url',
    icon: LinkIcon,
  },
  text: {
    placeholder: 'Type here...',
    keyboardType: 'default',
  },
  textarea: {
    placeholder: 'Type here...',
    keyboardType: 'default',
  },
};

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
  type,
  description,
  required,
}: Omit<InputProps, 'type'> & {
  type: TextType;
  onChange?: (value: string) => void;
  onValidityChange?: (state: boolean) => void;
}) => {
  const theme = useTheme();

  const isStandalone = !!button;
  const [value, setValue] = useState('');

  const [isValid, setValid] = useState(!isStandalone && !required);
  const [isTouched, setTouched] = useState(false);

  const regExp = pattern ? new RegExp(pattern) : null;
  const minLength = min as number;
  const maxLength = max as number;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, []);

  const checkValidity = useCallback(
    (text: string) => {
      if (!text && required) return false;
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
    const value = e.nativeEvent.text;
    const validity = checkValidity(value);

    setValue(value);
    setValid(validity);

    onChange?.(value);
    onValidityChange?.(validity);
  };

  const placeholderWithRequired =
    (placeholder ?? inputVariants[type].placeholder) + (required ? '*' : '');

  const [isFocused, setIsFocused] = useState(false);
  const InputIcon = inputVariants[type].icon;

  const finalDescription =
    description ??
    buildDefaultTextDescription({ min: minLength, max: maxLength });

  return (
    <Box flexDirection="column" gap={3}>
      <InputContainer
        borderColor={getBorderColor(isValid, isTouched, isFocused)}
      >
        <Box
          alignItems={type === 'textarea' ? 'flex-start' : 'center'}
          flexDirection="row"
          pl={2}
          pr={1}
          gap={1.5}
        >
          {InputIcon && (
            <InputIcon
              width={16}
              height={16}
              color={theme.colors.iconPrimary}
            />
          )}
          <TextInput
            keyboardType={inputVariants[type].keyboardType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              fontSize: theme.textVariants.text.fontSize,
              lineHeight: theme.textVariants.text.lineHeight,
              height: type === 'textarea' ? 66 : isStandalone ? 40 : undefined,
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
            multiline={type === 'textarea'}
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
        <Text color={getDescriptionColor(isValid, isTouched)} variant="caption">
          {finalDescription}
        </Text>
      )}
    </Box>
  );
};
