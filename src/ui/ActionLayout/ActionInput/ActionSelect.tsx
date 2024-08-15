import { Picker } from '@react-native-picker/picker';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { InputContainer, PickerModal } from '../../components';
import { ChevronDownIcon } from '../../icons';
import { Box, Text } from '../../index';
import { useTheme } from '../../theme';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';
import { getBorderColor, getDescriptionColor, getInputTextColor } from './util';

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

  useEffect(
    () => {
      onValidityChange?.(isValid);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const extendedChange = (_value: string) => {
    setTouched(true);
    close();
    setSelectedOption(options.find((option) => option.value === _value));
    //it's valid as long as it's selected
    setValid(true);

    onChange?.(_value);
    onValidityChange?.(true);
  };

  const pickerRef = useRef<Picker<any>>(null);
  const [isVisible, setVisible] = useState(false);

  const open = useCallback(() => {
    setVisible(true);
    Platform.OS === 'android' && pickerRef.current?.focus();
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    Platform.OS === 'android' && pickerRef.current?.blur();
  }, []);

  const theme = useTheme();

  return (
    <Box gap={1}>
      <InputContainer
        disabled={disabled}
        standalone={isStandalone}
        borderColor={getBorderColor(isValid, isTouched, isVisible)}
      >
        <TouchableOpacity onPress={disabled ? undefined : open}>
          <Box
            height={button ? 40 : undefined}
            pl={2}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              color={getInputTextColor(Boolean(value), disabled)}
              variant="text"
            >
              {value || placeholderWithRequired}
            </Text>
            <Box p={1.5}>
              <ChevronDownIcon color={theme.colors.iconPrimary} />
            </Box>
          </Box>
        </TouchableOpacity>
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
          color={getDescriptionColor(isValid, isTouched)}
          variant="caption"
          py={1}
        >
          {description}
        </Text>
      )}
      {Platform.OS === 'android' && (
        <Picker
          style={{ position: 'absolute', height: 0 }}
          enabled={false}
          ref={pickerRef}
          onValueChange={extendedChange}
          selectedValue={value}
          onBlur={() => setVisible(false)}
        >
          {options.map((it) => (
            <Picker.Item
              key={`${it.value}_${it.label}`}
              label={it.label}
              value={it.value}
            />
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
