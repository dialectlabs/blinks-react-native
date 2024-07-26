import { useState } from 'react';
import {
  type NativeSyntheticEvent,
  TextInput,
  type TextInputChangeEventData,
} from 'react-native';
import { Box } from '../index';
import { useTheme } from '../theme';
import { ActionButton } from './ActionButton';
import type { InputProps } from './types';

export const ActionInput = ({
  placeholder,
  name,
  button,
  disabled,
  onChange: extOnChange,
  required,
}: InputProps & { onChange?: (value: string) => void }) => {
  const theme = useTheme();
  const [value, onChange] = useState('');

  const extendedChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    onChange(e.nativeEvent.text);
    extOnChange?.(e.nativeEvent.text);
  };

  const placeholderWithRequired =
    (placeholder || 'Type here...') + (required ? '*' : '');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box
      borderRadius="input"
      borderWidth={1}
      p={1.5}
      borderColor={isFocused ? 'inputStrokeSelected' : 'inputStroke'}
      backgroundColor="inputBg"
    >
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          paddingVertical: theme.spacing[2],
          paddingHorizontal: theme.spacing[1],
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
      {button && (
        <Box mt={1.5}>
          <ActionButton
            {...button}
            onClick={() => button.onClick?.({ [name]: value })}
            disabled={button.disabled || value === ''}
          />
        </Box>
      )}
    </Box>
  );
};
