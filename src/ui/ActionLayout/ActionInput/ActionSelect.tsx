import { Picker } from '@react-native-picker/picker';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Pressable } from 'react-native';
import { InputContainer, PickerModal } from '../../components';
import { ChevronDownIcon } from '../../icons';
import { Box, Text } from '../../index';
import { useTheme } from '../../theme';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';
import { getDescriptionColor } from './util';

export const ActionSelect = ({
  placeholder,
  name,
  button,
  onChange,
  onValidityChange,
  disabled,
  description,
  required,
  options = [],
}: Omit<InputProps, 'type'> & {
  onChange?: (value: string) => void;
  onValidityChange?: (state: boolean) => void;
}) => {
  const isStandalone = !!button;
  const placeholderWithRequired =
    (placeholder || 'Select...') + (required ? '*' : '');

  const initiallySelectedOption = useMemo(
    () => options.find((option) => option.selected),
    [options],
  );

  const [selectedOption, setSelectedOption] = useState(initiallySelectedOption);
  const value = selectedOption?.value ?? '';
  const [isValid, setValid] = useState(
    isStandalone
      ? !!initiallySelectedOption
      : !(required && !initiallySelectedOption),
  );

  const [isTouched, setTouched] = useState(false);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, []);

  const extendedChange = useCallback(
    (value: string) => {
      setTouched(true);
      close();
      setSelectedOption(options.find((option) => option.value === value));
      //it's valid as long as it's selected
      setValid(true);

      onChange?.(value);
      onValidityChange?.(true);
    },
    [value],
  );

  const pickerRef = useRef<Picker<any>>(null);
  const [isVisible, setVisible] = useState(false);

  const open = useCallback(() => {
    Platform.OS === 'android' ? pickerRef.current?.focus() : setVisible(true);
  }, []);

  const close = useCallback(() => {
    Platform.OS === 'android' ? pickerRef.current?.blur() : setVisible(false);
  }, []);
  const theme = useTheme();

  return (
    <Box gap={3}>
      <InputContainer borderColor={'inputStroke'}>
        <Pressable onPress={disabled ? undefined : open}>
          <Box
            height={button ? 40 : undefined}
            pl={2}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              color={
                disabled
                  ? 'textInputDisabled'
                  : value
                    ? 'textInput'
                    : 'textInputPlaceholder'
              }
              variant="text"
            >
              {value ?? placeholderWithRequired}
            </Text>
            <Box p={1.5}>
              <ChevronDownIcon color={theme.colors.iconPrimary} />
            </Box>
          </Box>
        </Pressable>
        {button && (
          <Box mt={1.5}>
            <ActionButton
              {...button}
              onClick={() => button.onClick({ [name]: value })}
              disabled={button.disabled || value === '' || !isValid}
            />
          </Box>
        )}
      </InputContainer>
      {description && (
        <Text color={getDescriptionColor(isValid, isTouched)} variant="caption">
          {description}
        </Text>
      )}
      {Platform.OS === 'android' && (
        <Picker
          style={{ height: 0 }}
          enabled={false}
          ref={pickerRef}
          onValueChange={extendedChange}
          selectedValue={value}
        >
          {options.map((it) => (
            <Picker.Item label={it.label} value={it.value} />
          ))}
        </Picker>
      )}
      {Platform.OS === 'ios' && (
        <PickerModal
          value={value}
          isVisible={isVisible}
          onCancel={close}
          onConfirm={extendedChange}
          options={options}
        />
      )}
    </Box>
  );
};