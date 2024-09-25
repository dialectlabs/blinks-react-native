import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableHighlight, useColorScheme } from 'react-native';
import { BottomSheetModal } from './BottomSheetModal';
import { Box } from './Box';
import { Text } from './Text';

//these are ios colors
export const COLORS = {
  dark: {
    backgroundColor: '#0E0E0E',
    highlightColor: '#444444',
    borderColor: '#272729',
    itemColor: '#FFFFFF',
  },
  light: {
    backgroundColor: '#FFFFFF',
    highlightColor: '#ebebeb',
    borderColor: '#d5d5d5',
    itemColor: undefined,
  },
};
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

  useEffect(
    () => {
      if (isVisible) {
        setVal(value || (options[0]?.value ?? ''));
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [isVisible],
  );

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm(val);
  };

  const handleChange = (v: string) => {
    if (onChange) {
      onChange(v);
    }
    setVal(v);
  };
  const scheme = useColorScheme() ?? 'light';

  return (
    <BottomSheetModal isVisible={isVisible} onBackdropPress={handleCancel}>
      <Box
        mb={2}
        overflow="hidden"
        style={[
          styles.container,
          { backgroundColor: COLORS[scheme].backgroundColor },
        ]}
      >
        <Box mb={2}>
          <Picker selectedValue={val} onValueChange={handleChange}>
            {options.map((it) => (
              <Picker.Item
                color={COLORS[scheme].itemColor}
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
  const scheme = useColorScheme() ?? 'light';
  const colors = {
    backgroundColor: COLORS[scheme].backgroundColor,
    borderColor: COLORS[scheme].borderColor,
  };
  return (
    <TouchableHighlight
      style={[
        colors,
        styles.button,
        standalone ? styles.buttonStandalone : styles.buttonInline,
      ]}
      underlayColor={COLORS[scheme].highlightColor}
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
  },
});
