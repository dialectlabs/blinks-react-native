import { type ReactNode, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { InputContainer } from '../../components';
import { CalendarIcon, ClockIcon } from '../../icons';
import { Box, Text } from '../../index';
import { useTheme } from '../../theme';
import { ActionButton } from '../ActionButton';
import type { InputProps } from '../types';

type Mode = 'date' | 'time' | 'datetime';
const PickerButton = ({
  isOpen,
  onPress,
  icon,
  value,
}: {
  isOpen: boolean;
  onPress: () => void;
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

function extractTimeValue(date: Date) {
  return (
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0')
  );
}
function extractDateValue(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const ActionDateTimeInput = ({
  type = 'date',
  placeholder,
  name,
  button,
  disabled,
  onChange,
  min,
  max,
  description,
  required,
}: Omit<InputProps, 'type'> & {
  type?: 'date' | 'datetime-local';
  onChange?: (value: string) => void;
  onValidityChange?: (state: boolean) => void;
}) => {
  const theme = useTheme();
  const [isValid, setValid] = useState(button ? false : !required);

  const minDate = min as string | undefined;
  const maxDate = max as string | undefined;

  const [dateValue, setDateValue] = useState(extractDateValue(new Date()));
  const [timeValue, setTimeValue] = useState(extractTimeValue(new Date()));
  const date = new Date(`${dateValue}T${timeValue}`);
  const value = type === 'date' ? dateValue : `${dateValue}T${timeValue}`;

  const [mode, setMode] = useState<Mode>('date');
  const [isOpen, setIsOpen] = useState(false);

  const onChangeInternal = (selectedDate: Date) => {
    setIsOpen(false);
    if (mode === 'date') {
      setDateValue(extractDateValue(selectedDate));
    } else if (mode === 'time') {
      setTimeValue(extractTimeValue(selectedDate));
    } else {
      setDateValue(extractDateValue(selectedDate));
      setTimeValue(extractTimeValue(selectedDate));
    }
  };

  const showPicker = (mode: Mode) => {
    setIsOpen(true);
    setMode(mode);
  };

  const showDatePicker = () => {
    showPicker('date');
  };

  const showTimePicker = () => {
    showPicker('time');
  };
  const showDateTimePicker = () => {
    showPicker('datetime');
  };

  const getInputButton = () => {
    if (type === 'date') {
      return (
        <PickerButton
          isOpen={isOpen}
          onPress={showDatePicker}
          icon={<CalendarIcon color={theme.colors.iconPrimary} />}
          value={date.toDateString()}
        />
      );
    }
    //TODO do we need single input only for ios?
    if (Platform.OS === 'ios') {
      return (
        <PickerButton
          isOpen={isOpen}
          onPress={showDateTimePicker}
          icon={<CalendarIcon color={theme.colors.iconPrimary} />}
          value={date.toLocaleString()}
        />
      );
    }
    return (
      <Box gap={2}>
        <PickerButton
          isOpen={isOpen && mode === 'date'}
          onPress={showDatePicker}
          icon={<CalendarIcon color={theme.colors.iconPrimary} />}
          value={date.toLocaleDateString()}
        />
        <PickerButton
          isOpen={isOpen && mode === 'time'}
          onPress={showTimePicker}
          icon={<ClockIcon color={theme.colors.iconPrimary} />}
          value={date.toLocaleTimeString()}
        />
      </Box>
    );
  };

  return (
    <Box gap={3}>
      {getInputButton()}
      {button && (
        <ActionButton
          {...button}
          onClick={() => button.onClick({ [name]: value })}
          disabled={button.disabled || value === '' || !isValid}
        /> //TODO hmmmm ask Sabina
      )}
      <DateTimePickerModal
        isVisible={isOpen}
        mode={mode}
        onConfirm={onChangeInternal}
        onCancel={() => setIsOpen(false)}
      />
    </Box>
  );
};
