import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Box, InputContainer, Text } from '../../components';
import { CalendarIcon, ClockIcon } from '../../icons';
import type { BorderRadiiVars, ColorVars, SpacingVars } from '../../theme';
import { useTheme } from '../../theme';
import type { InputProps } from '../../types';
import { ActionButton } from '../ActionButton';
import { ActionTextInput } from './ActionTextInput';
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
      <TouchableOpacity
        disabled={disabled}
        onPress={!disabled ? onPress : undefined}
      >
        <Box pl={2} flexDirection="row" alignItems="center" gap={1.5}>
          {icon}
          <Text variant="text" color={getInputTextColor(isSelected, disabled)}>
            {value}
          </Text>
        </Box>
      </TouchableOpacity>
    </InputContainer>
  );
};

export const ActionDateTimeInput = (
  props: InputProps & {
    onChange?: (value: string) => void;
    onValidityChange?: (state: boolean) => void;
  },
) => {
  if (props.pattern) {
    return <ActionTextInput {...props} icon={CalendarIcon} />;
  }
  return <DateTimeInput {...props} />;
};

const DateTimeInput = ({
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

  const value = useMemo(() => {
    if (dateValue && timeValue) {
      return `${dateValue}T${timeValue}`;
    }
    return '';
  }, [dateValue, timeValue]);

  const defaultDate = maxDate
    ? new Date(Math.min(Date.now(), maxDate.valueOf()))
    : new Date();

  const displayedDate = useMemo(
    () => {
      const date = new Date(defaultDate);
      if (dateValue) {
        const [y, m, d] = dateValue.split('-');
        date.setFullYear(parseInt(y!, 10));
        date.setMonth(parseInt(m!, 10) - 1);
        date.setDate(parseInt(d!, 10));
      }
      if (timeValue) {
        const [h, mm] = timeValue.split(':');
        date.setHours(parseInt(h!, 10), parseInt(mm!, 10));
      }
      return date;
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [dateValue, timeValue],
  );

  const [mode, setMode] = useState<Mode>('date');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    () => {
      onValidityChange?.(isValid);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
    } else {
      setTimeValue(extractTimeValue(selectedDate));
    }
  };

  useEffect(
    () => {
      if (value) {
        const validity = checkValidity(new Date(value));

        setValid(validity);

        onChange?.(value);
        onValidityChange?.(validity);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  );

  const openPicker = (pickerMode: Mode) => {
    setIsOpen(true);
    setMode(pickerMode);
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
