import { InputContainer } from '../components';
import { CheckBoxIcon } from '../icons';
import { Box, Text } from '../index';
import { useTheme } from '../theme';

interface Option {
  title: string;
  value: string;
  selected?: boolean;
}
const RadioButton = ({ selected }: { selected?: boolean }) => {
  return (
    <Box
      width={16}
      height={16}
      p={1}
      borderRadius="full"
      borderWidth={selected ? 0 : 1}
      borderColor="inputStroke"
      backgroundColor={selected ? 'inputStrokeSelected' : 'inputBg'} //TODO bg token
    >
      {selected && (
        <Box
          borderRadius="full"
          width={8}
          height={8}
          backgroundColor="inputBg"
        />
      )}
    </Box>
  );
};

const CheckBox = ({ selected }: { selected?: boolean }) => {
  const theme = useTheme();
  return (
    <Box
      width={16}
      height={16}
      alignItems="center"
      justifyContent="center"
      style={{ borderRadius: 3 }}
      borderWidth={selected ? 0 : 1}
      borderColor="inputStroke"
      backgroundColor={selected ? 'inputStrokeSelected' : 'inputBg'} //TODO bg token
    >
      {selected && <CheckBoxIcon color={theme.colors.inputBg} />}
    </Box>
  );
};
export const ActionSelectablesGroup = ({
  type,
  options,
  onSelect,
}: {
  type: 'radio' | 'checkbox';
  options: Option[];
  onSelect: (opt: Option) => void;
}) => {
  return (
    <Box flexDirection="column" gap={3}>
      {options.map((it) => (
        <InputContainer
          key={it.value}
          borderColor={it.selected ? 'inputStrokeSelected' : 'inputStroke'} //TODO another color
        >
          <Box pl={2} flexDirection="row" alignItems="center" gap={3}>
            {type === 'checkbox' ? (
              <CheckBox selected={it.selected} />
            ) : (
              <RadioButton selected={it.selected} />
            )}
            <Text variant="text" color="textInput">
              {it.title}
            </Text>
          </Box>
        </InputContainer>
      ))}
    </Box>
  );
};
