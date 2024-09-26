import { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Box, InputContainer, Text } from '../../components';
import { CalendarIcon } from '../../icons';
import { useTheme } from '../../theme';
import type { InputProps } from '../../types';
import { ActionButton } from '../ActionButton';
import { ActionTextInput } from './ActionTextInput';
import {
  buildDefaultDateDescription,
  extractDateValue,
  getBorderColor,
  getDescriptionColor,
  getInputTextColor,
} from './util';

export const ActionDateInput = (
  props: InputProps & {
    onChange?: (value: string) => void;
    onValidityChange?: (state: boolean) => void;
  },
) => {
  if (props.pattern) {
    return <ActionTextInput {...props} icon={CalendarIcon} />;
  }
  return <DateInput {...props} />;
};

const DateInput = ({
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
  const displayedDate = useMemo(
    () => {
      if (value) return new Date(value);
      return maxDate
        ? new Date(Math.min(Date.now(), maxDate.valueOf()))
        : new Date();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    () => {
      onValidityChange?.(isValid);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
    const valid = checkValidity(selectedDate);

    setValue(dateValue);
    setValid(valid);

    onChange?.(dateValue);
    onValidityChange?.(valid);
  };

  const openPicker = () => {
    setIsOpen(true);
  };
  const closePicker = () => {
    setIsOpen(false);
  };

  const placeholderWithRequired =
    (placeholder || 'Enter a date') + (required ? '*' : '');
  const finalDescription =
    description ?? buildDefaultDateDescription({ minDate, maxDate });

  return (
    <Box gap={1}>
      <InputContainer
        standalone={isStandalone}
        disabled={disabled}
        borderColor={getBorderColor(isValid, isTouched, isOpen)}
      >
        <TouchableOpacity
          disabled={disabled}
          onPress={disabled ? undefined : openPicker}
        >
          <Box
            pl={2}
            flexDirection="row"
            alignItems="center"
            gap={1.5}
            height={isStandalone ? 40 : undefined}
          >
            <CalendarIcon color={theme.colors.iconPrimary} />
            <Text
              variant="text"
              color={getInputTextColor(Boolean(value), disabled)}
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
        <Text
          color={getDescriptionColor(isValid, isTouched)}
          py={1}
          variant="caption"
        >
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
