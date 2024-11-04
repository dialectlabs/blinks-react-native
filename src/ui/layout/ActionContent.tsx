import { useState } from 'react';
import { Dimensions } from 'react-native';
import { Box } from '../components';
import { useTheme } from '../theme';
import { type LayoutProps } from '../types';
import { ActionButton } from './ActionButton';
import { ActionInput } from './ActionInput';

export const ActionContent = ({
  inputs,
  buttons,
}: Pick<LayoutProps, 'buttons' | 'inputs'>) => {
  const theme = useTheme();
  const buttonGap = theme.spacing.betweenButtons;
  const [maxWidth, setMaxWidth] = useState<number>(
    Dimensions.get('window').width / 4 - buttonGap,
  );

  return (
    <Box flexDirection="column" gap="betweenInputs">
      {buttons && buttons.length > 0 && (
        <Box
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
          gap="betweenButtons"
          onLayout={(it) =>
            setMaxWidth(it.nativeEvent.layout.width / 3 - buttonGap)
          }
        >
          {buttons?.map((it, index) => (
            <Box key={index} flexGrow={1} flexBasis={maxWidth}>
              <ActionButton {...it} />
            </Box>
          ))}
        </Box>
      )}
      {inputs?.map((input) => <ActionInput key={input.name} {...input} />)}
    </Box>
  );
};
