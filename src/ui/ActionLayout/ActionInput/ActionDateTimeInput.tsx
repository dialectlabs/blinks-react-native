import { type ReactNode, useState } from 'react';
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
} from './util';

type Mode = 'date' | 'time';
const PickerInput = ({
  isOpen,
  onPress,
  icon,
  value,
}: {
  isOpen: boolean;
  onPress?: () => void;
  icon: ReactNode;
  value: string;
}) => {
  const borderColor = 'inputStroke';
  return (
    <InputContainer borderColor={borderColor}>
      <TouchableOpacity onPress={onPress}>
        <Box pl={2} flexDirection="row" alignItems="center" gap={3}>
          {icon}
          <Text variant="text" color="textInput">
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
  const [touched, setTouched] = useState(false);

  const minDate = min ? new Date(min as string) : null;
  const maxDate = max ? new Date(max as string) : null;

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const date = new Date(`${dateValue}T${timeValue}`);
  const value = `${dateValue}T${timeValue}`;

  const [mode, setMode] = useState<Mode>('date');
  const [isOpen, setIsOpen] = useState(false);

  const extendedChange = (selectedDate: Date) => {
    setIsOpen(false);
    if (mode === 'date') {
      setDateValue(extractDateValue(selectedDate));
    } else {
      setTimeValue(extractTimeValue(selectedDate));
    }
    //TODO check validity
  };

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
    setTouched(true);
    setIsOpen(false);
  };

  const placeholderWithRequired =
    (placeholder || 'Enter a date') + (required ? '*' : '');
  const finalDescription =
    description ?? buildDefaultDateDescription({ minDate, maxDate });

  const standaloneProps = isStandalone
    ? {
        backgroundColor: 'bgSecondary' as keyof ColorVars,
        padding: 2 as keyof SpacingVars,
        borderRadius: 'xl' as keyof BorderRadiiVars,
      }
    : {};

  return (
    <Box gap={3} {...standaloneProps}>
      <Text
        variant={isStandalone ? 'text' : 'subtext'}
        fontWeight="600"
        color="textPrimary"
        p={isStandalone ? 2 : 0}
        pb={0}
      >
        {placeholderWithRequired}
      </Text>
      <PickerInput
        isOpen={isOpen && mode === 'date'}
        onPress={!disabled ? showDatePicker : undefined}
        icon={<CalendarIcon color={theme.colors.iconPrimary} />}
        value={dateValue && date.toLocaleDateString()}
      />
      <PickerInput
        isOpen={isOpen && mode === 'time'}
        onPress={!disabled ? showTimePicker : undefined}
        icon={<ClockIcon color={theme.colors.iconPrimary} />}
        value={dateValue && date.toLocaleTimeString()}
      />
      {button && (
        <ActionButton
          {...button}
          onClick={() => button.onClick({ [name]: value })}
          disabled={button.disabled || value === '' || !isValid}
        />
      )}
      {finalDescription && (
        <Text
          color={touched && !isValid ? 'textError' : 'textSecondary'}
          variant="caption"
          p={isStandalone ? 2 : 0}
          pt={0}
        >
          {finalDescription}
        </Text>
      )}
      <DateTimePickerModal
        maximumDate={maxDate ?? undefined}
        minimumDate={minDate ?? undefined}
        isVisible={isOpen}
        mode={mode}
        onConfirm={extendedChange}
        onCancel={closePicker}
      />
    </Box>
  );
};
