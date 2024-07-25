import { useState } from 'react';
import { Dimensions } from 'react-native';
import { Box } from '../index';
import { ActionButton } from './ActionButton';
import { ActionInput } from './ActionInput';
import { type LayoutProps } from './types';

export const SOFT_LIMIT_BUTTONS = 10;
export const SOFT_LIMIT_INPUTS = 3;

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
          {buttons?.slice(0, SOFT_LIMIT_BUTTONS).map((it, index) => (
            <Box key={index} flexGrow={1} flexBasis={maxWidth}>
              <ActionButton {...it} />
            </Box>
          ))}
        </Box>
      )}
      {inputs
        ?.slice(0, SOFT_LIMIT_INPUTS)
        .map((input) => <ActionInput key={input.name} {...input} />)}
    </Box>
  );
};
