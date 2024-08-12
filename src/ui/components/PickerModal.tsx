import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import {
  DynamicColorIOS,
  StyleSheet,
  TouchableHighlight,
  useColorScheme,
} from 'react-native';
import { Box, Text } from '../index';
import { BottomSheetModal } from './BottomSheetModal';

const BACKGROUND_COLOR = DynamicColorIOS({
  dark: '#0E0E0E',
  light: '#FFFFFF',
});

const HIGHLIGHT_COLOR = DynamicColorIOS({
  dark: '#444444',
  light: '#ebebeb',
});
const BORDER_COLOR = DynamicColorIOS({
  dark: '#272729',
  light: '#d5d5d5',
});

export const BORDER_RADIUS = 13;
export const BUTTON_FONT_WEIGHT = 'normal';
export const BUTTON_FONT_COLOR = '#007ff9';
export const BUTTON_FONT_SIZE = 20;

type Props = {
  value: string;
  options: { value: string; label: string }[];
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: (value: string) => void;
  onChange?: (value: string) => void;
};

export const PickerModal = ({
  isVisible,
  value,
  options,
  onCancel,
  onConfirm,
  onChange,
}: Props) => {
  const [val, setVal] = useState(value);

  useEffect(() => {
    if (isVisible) {
      setVal(value);
    }
  }, [isVisible]);

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm(val);
  };

  const handleChange = (v: string) => {
    console.log(v);
    if (onChange) {
      onChange(v);
    }
    setVal(v);
  };
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <BottomSheetModal isVisible={isVisible} onBackdropPress={handleCancel}>
      <Box mb={2} overflow="hidden" style={styles.container}>
        <Box mb={2}>
          <Picker selectedValue={val} onValueChange={handleChange}>
            {options.map((it) => (
              <Picker.Item
                color={isDarkMode ? 'white' : undefined}
                key={`${it.value}_${it.label}`}
                label={it.label}
                value={it.value}
              />
            ))}
          </Picker>
        </Box>
        <ConfirmButton onPress={handleConfirm} label="Confirm" />
      </Box>
      <CancelButton onPress={handleCancel} label="Cancel" />
    </BottomSheetModal>
  );
};

interface ButtonProps {
  onPress: () => void;
  label: string;
  standalone?: boolean;
}

const ConfirmButton = (props: ButtonProps) => (
  <BottomSheetButton {...props} standalone={false} />
);

const CancelButton = (props: ButtonProps) => (
  <BottomSheetButton {...props} standalone={true} />
);

const BottomSheetButton = ({ onPress, label, standalone }: ButtonProps) => {
  return (
    <TouchableHighlight
      style={[
        styles.button,
        standalone ? styles.buttonStandalone : styles.buttonInline,
      ]}
      underlayColor={HIGHLIGHT_COLOR}
      onPress={onPress}
    >
      <Text
        p={2.5}
        fontSize={BUTTON_FONT_SIZE}
        textAlign="center"
        fontWeight={standalone ? '600' : BUTTON_FONT_WEIGHT}
        style={{ color: BUTTON_FONT_COLOR }}
      >
        {label}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: BACKGROUND_COLOR,
    borderColor: BORDER_COLOR,
    height: 57,
    justifyContent: 'center',
  },
  buttonStandalone: {
    borderRadius: BORDER_RADIUS,
  },
  buttonInline: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  container: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: BACKGROUND_COLOR,
  },
});
