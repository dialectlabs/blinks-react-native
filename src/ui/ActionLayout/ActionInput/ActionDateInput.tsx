import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { InputContainer } from '../../components';
import { CalendarIcon } from '../../icons';
import { Box, Text } from '../../index';
import { useTheme } from '../../theme';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';
import {
  buildDefaultDateDescription,
  extractDateValue,
  getDescriptionColor,
} from './util';

export const ActionDateInput = ({
  placeholder,
  name,
  button,
  disabled,
  onChange,
  onValidityChange,
  min,
  max,
  description,
  required,
}: Omit<InputProps, 'type'> & {
  onChange?: (value: string) => void;
  onValidityChange?: (state: boolean) => void;
}) => {
  const theme = useTheme();
  const isStandalone = !!button;
  const [isValid, setValid] = useState(!isStandalone && !required);
  const [isTouched, setTouched] = useState(false);

  const minDate = min ? new Date(min as string) : null;
  const maxDate = max ? new Date(max as string) : null;

  const [value, setValue] = useState('');
  const [displayedDate, setDisplayedDate] = useState(
    maxDate ? new Date(Math.min(Date.now(), maxDate.valueOf())) : new Date(),
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, []);

  const checkValidity = (date: Date) => {
    const leftRange = minDate ? date >= minDate : true;

    //comparing with the start of next day
    maxDate && maxDate.setDate(maxDate.getDate() + 1);
    const rightRange = maxDate ? date < maxDate : true;
    return leftRange && rightRange;
  };

  const extendedChange = (selectedDate: Date) => {
    setTouched(true);
    closePicker();

    const dateValue = extractDateValue(selectedDate);
    const isValid = checkValidity(selectedDate);

    setValue(dateValue);
    setDisplayedDate(selectedDate);
    setValid(isValid);

    onChange?.(dateValue);
    onValidityChange?.(isValid);
  };

  const openPicker = () => {
    setIsOpen(true);
  };
  const closePicker = () => {
    setIsOpen(false);
  };

  const borderColor = 'inputStroke';

  const placeholderWithRequired =
    (placeholder || 'Enter a date') + (required ? '*' : '');
  const finalDescription =
    description ?? buildDefaultDateDescription({ minDate, maxDate });

  return (
    <Box gap={3}>
      <InputContainer borderColor={borderColor}>
        <TouchableOpacity onPress={disabled ? undefined : openPicker}>
          <Box
            pl={2}
            flexDirection="row"
            alignItems="center"
            gap={1.5}
            height={40}
          >
            <CalendarIcon color={theme.colors.iconPrimary} />
            <Text
              variant="text"
              color={value ? 'textInput' : 'textInputPlaceholder'}
            >
              {value
                ? displayedDate.toLocaleDateString()
                : placeholderWithRequired}
            </Text>
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
      {finalDescription && (
        <Text color={getDescriptionColor(isValid, isTouched)} variant="caption">
          {finalDescription}
        </Text>
      )}
      <DateTimePickerModal
        minimumDate={minDate ?? undefined}
        maximumDate={maxDate ?? undefined}
        isVisible={isOpen}
        date={displayedDate}
        mode="date"
        onConfirm={extendedChange}
        onCancel={closePicker}
      />
    </Box>
  );
};
