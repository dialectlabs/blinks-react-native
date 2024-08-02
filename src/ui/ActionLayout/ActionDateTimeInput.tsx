import { type ReactNode, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { InputContainer } from '../components';
import { CalendarIcon, ClockIcon } from '../icons';
import { Box, Text } from '../index';
import { useTheme } from '../theme';
import { type InputProps } from './types';

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
  const borderColor = isOpen ? 'inputStrokeSelected' : 'inputStroke';
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
  type,
}: InputProps & { onChange?: (value: string) => void }) => {
  const theme = useTheme();

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<Mode>('date');
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (selectedDate: Date) => {
    const currentDate = selectedDate;
    setIsOpen(false);
    setDate(currentDate);
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

    //TODO same date
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
    <>
      {getInputButton()}
      <DateTimePickerModal
        isVisible={isOpen}
        mode={mode}
        onConfirm={onChange}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};
