import { type ReactNode, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { InputContainer } from '../../components';
import { CalendarIcon, ClockIcon } from '../../icons';
import { Box, Text } from '../../index';
import { useTheme } from '../../theme';
import type {
  BorderRadiiVars,
  ColorVars,
  SpacingVars,
} from '../../theme/types';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';
import {
  buildDefaultDateDescription,
  extractDateValue,
  extractTimeValue,
  getBorderColor,
  getDescriptionColor,
  getInputTextColor,
} from './util';

type Mode = 'date' | 'time';
const PickerInput = ({
  isValid,
  isOpen,
  onPress,
  icon,
  value,
  isSelected,
  disabled,
}: {
  disabled?: boolean;
  isValid: boolean;
  isOpen: boolean;
  onPress?: () => void;
  icon: ReactNode;
  value: string;
  isSelected: boolean;
}) => {
  return (
    <InputContainer
      disabled={disabled}
      borderColor={getBorderColor(isValid, isSelected, isOpen)}
    >
      <TouchableOpacity onPress={!disabled ? onPress : undefined}>
        <Box pl={2} flexDirection="row" alignItems="center" gap={3}>
          {icon}
          <Text variant="text" color={getInputTextColor(isSelected, disabled)}>
            {value}
          </Text>
        </Box>
      </TouchableOpacity>
    </InputContainer>
  );
};

export const ActionDateTimeInput = ({
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

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [value, setValue] = useState('');

  const [displayedDate, setDisplayedDate] = useState(
    maxDate ? new Date(Math.min(Date.now(), maxDate.valueOf())) : new Date(),
  );

  const [mode, setMode] = useState<Mode>('date');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, []);

  const checkValidity = (date: Date) => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;

    return true;
  };

  const extendedChange = (selectedDate: Date) => {
    setTouched(true);
    closePicker();
    if (mode === 'date') {
      setDateValue(extractDateValue(selectedDate));
      displayedDate.setFullYear(selectedDate.getFullYear());
      displayedDate.setDate(selectedDate.getDate());
      displayedDate.setMonth(selectedDate.getMonth());
    } else {
      setTimeValue(extractTimeValue(selectedDate));
      displayedDate.setHours(
        selectedDate.getHours(),
        selectedDate.getMinutes(),
      );
    }
    setDisplayedDate(displayedDate);
  };

  useEffect(() => {
    if (dateValue && timeValue) {
      const value = `${dateValue}T${timeValue}`;
      const validity = checkValidity(new Date(value));

      setValue(value);
      setValid(validity);

      onChange?.(value);
      onValidityChange?.(validity);
    }
  }, [dateValue, timeValue]);

  const openPicker = (mode: Mode) => {
    setIsOpen(true);
    setMode(mode);
  };

  const showDatePicker = () => {
    openPicker('date');
  };

  const showTimePicker = () => {
    openPicker('time');
  };

  const closePicker = () => {
    setIsOpen(false);
  };

  const placeholderWithRequired =
    (placeholder || 'Enter a date') + (required ? '*' : '');
  const finalDescription =
    description ?? buildDefaultDateDescription({ minDate, maxDate });

  const standaloneProps = isStandalone
    ? {
        container: {
          backgroundColor: 'bgSecondary' as keyof ColorVars,
          padding: 2 as keyof SpacingVars,
          borderRadius: 'xl' as keyof BorderRadiiVars,
        },
        text: {
          px: 2 as keyof SpacingVars,
        },
      }
    : {};

  return (
    <Box gap={1} {...standaloneProps.container}>
      <Text
        variant="subtext"
        fontWeight="600"
        color="textPrimary"
        py={1}
        {...standaloneProps.text}
      >
        {placeholderWithRequired}
      </Text>
      <Box gap={3}>
        <PickerInput
          disabled={disabled}
          isValid={isValid}
          isOpen={isOpen && mode === 'date'}
          onPress={showDatePicker}
          icon={<CalendarIcon color={theme.colors.iconPrimary} />}
          value={displayedDate.toLocaleDateString()}
          isSelected={!!dateValue}
        />
        <PickerInput
          disabled={disabled}
          isValid={isValid}
          isOpen={isOpen && mode === 'time'}
          onPress={showTimePicker}
          icon={<ClockIcon color={theme.colors.iconPrimary} />}
          value={displayedDate.toLocaleTimeString()}
          isSelected={!!timeValue}
        />
        {button && (
          <ActionButton
            {...button}
            onClick={() => button.onClick({ [name]: value })}
            disabled={button.disabled || value === '' || !isValid}
          />
        )}
      </Box>
      {finalDescription && (
        <Text
          color={getDescriptionColor(isValid, isTouched)}
          variant="caption"
          py={1}
          {...standaloneProps.text}
        >
          {finalDescription}
        </Text>
      )}
      <DateTimePickerModal
        date={displayedDate}
        isVisible={isOpen}
        mode={mode}
        onConfirm={extendedChange}
        onCancel={closePicker}
      />
    </Box>
  );
};
