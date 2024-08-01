import { useCallback, useState } from 'react';
import {
  type NativeSyntheticEvent,
  TextInput,
  type TextInputChangeEventData,
} from 'react-native';
import { AtSignIcon, LinkIcon } from '../icons';
import { Box } from '../index';
import { useTheme } from '../theme';
import { ActionButton } from './ActionButton';
import type { InputProps } from './types';

export const ActionTextInput = ({
  placeholder,
  name,
  button,
  disabled,
  onChange: extOnChange,
  pattern,
  min,
  max,
  type,
  // description,
  required,
}: InputProps & { onChange?: (value: string) => void }) => {
  const theme = useTheme();

  const [isValid, setValid] = useState(true);
  const [value, onChange] = useState('');

  const regExp = pattern ? new RegExp(pattern) : null;
  const checkValidity = useCallback(
    (text: string) => {
      if (!text && required) return false;
      if (text.length < (min as number) || text.length > (max as number))
        return false;
      if (regExp) {
        return regExp.test(text);
      }
      return true;
    },
    [min, max, regExp, required],
  );

  const extendedChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    onChange(e.nativeEvent.text);
    extOnChange?.(e.nativeEvent.text);
    setValid(checkValidity(e.nativeEvent.text));
  };

  const placeholderWithRequired =
    (placeholder || 'Type here...') + (required ? '*' : '');
  const [isFocused, setIsFocused] = useState(false);

  function resolveKeyboardType() {
    if (type === 'number') return 'numeric';
    if (type === 'url') return 'url';
    if (type === 'email') return 'email-address';
    //if text or textarea -
    return undefined;
  }
  function getLeftAdornment() {
    if (type === 'url')
      return (
        <LinkIcon width={16} height={16} color={theme.colors.iconPrimary} />
      );
    if (type === 'email')
      return <AtSignIcon color={theme.colors.iconPrimary} />;
    return null;
  }

  return (
    <Box
      borderRadius="input"
      borderWidth={1}
      minHeight={40}
      p={1.5}
      borderColor={
        isFocused
          ? 'inputStrokeSelected'
          : isValid
            ? 'inputStroke'
            : 'inputStrokeError'
      }
      backgroundColor="inputBg"
      justifyContent="center"
    >
      <Box
        alignItems="center"
        flexDirection="row"
        pl={2}
        pr={1}
        gap={1.5}
        // minHeight={button ? 40 : undefined}
      >
        {getLeftAdornment()}
        <TextInput
          keyboardType={resolveKeyboardType()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
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
    </Box>
  );
};
