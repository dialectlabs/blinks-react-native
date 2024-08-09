import { Picker } from '@react-native-picker/picker';
import { useMemo, useRef, useState } from 'react';
import { Modal, Platform, Pressable, TouchableOpacity } from 'react-native';
import { InputContainer } from '../../components';
import { ChevronDownIcon } from '../../icons';
import { Box, Text } from '../../index';
import { useTheme } from '../../theme';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';

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

  const extendedChange = (value: string) => {
    setSelectedOption(options.find((option) => option.value === value));
    //it's valid as long as it's selected
    setValid(true);

    onChange?.(value);
    onValidityChange?.(true);
  };

  const pickerRef = useRef<Picker<any>>(null);
  const [isVisible, setVisible] = useState(false);

  function open() {
    Platform.OS === 'android' ? pickerRef.current?.focus() : setVisible(true);
  }

  function close() {
    Platform.OS === 'android' ? pickerRef.current?.blur() : setVisible(false);
  }
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
        <Text
          color={!isValid ? 'textError' : 'textSecondary'}
          variant="caption"
        >
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
        <Modal visible={isVisible} transparent>
          <TouchableOpacity
            onPress={close}
            style={{ flex: 1, backgroundColor: 'black', opacity: 0.4 }}
          />
          <Box backgroundColor="inputBg">
            <Picker onValueChange={extendedChange} selectedValue={value}>
              {options.map((it) => (
                <Picker.Item
                  key={`${it.value}_${it.label}`}
                  label={it.label}
                  value={it.value}
                />
              ))}
            </Picker>
          </Box>
        </Modal>
      )}
    </Box>
  );
};
