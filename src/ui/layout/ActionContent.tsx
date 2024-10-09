import { useState } from 'react';
import { Dimensions } from 'react-native';
import { Box } from '../components';
import { type LayoutProps } from '../types';
import { ActionButton } from './ActionButton';
import { ActionInput } from './ActionInput';

export const ActionContent = ({
  inputs,
  buttons,
}: Pick<LayoutProps, 'buttons' | 'inputs'>) => {
  const [maxWidth, setMaxWidth] = useState<number>(
    Dimensions.get('window').width / 4 - 8,
  );

  return (
    <Box flexDirection="column" gap={3}>
      {buttons && buttons.length > 0 && (
        <Box
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
          gap={2}
          onLayout={(it) => setMaxWidth(it.nativeEvent.layout.width / 3 - 8)}
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
