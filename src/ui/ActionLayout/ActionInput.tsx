import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
} from 'react-native';
import { Box } from '../index';
import { ActionButton } from './ActionButton';
import theme from '../theme';
import type { InputProps } from './types';

export const ActionInput = ({
  placeholder,
  name,
  button,
  disabled,
  onChange: extOnChange,
  required,
}: InputProps & { onChange?: (value: string) => void }) => {
  const [value, onChange] = useState('');

  const extendedChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    onChange(e.nativeEvent.text);
    extOnChange?.(e.nativeEvent.text);
  };

  const placeholderWithRequired =
    (placeholder || 'Type here...') + (required ? '*' : '');

  return (
    <Box
      borderRadius="input"
      borderWidth={1}
      p={1.5}
      borderColor="input-stroke"
      backgroundColor="input-bg"
    >
      <TextInput
        style={{
          paddingVertical: 8,
          paddingHorizontal: 4,
          color: disabled
            ? theme.colors['text-input-disabled']
            : theme.colors['text-input'],
          outlineStyle: 'none',
        }}
        placeholderTextColor={theme.colors['text-input-placeholder']}
        placeholder={placeholderWithRequired}
        value={value}
        disabled={disabled}
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
