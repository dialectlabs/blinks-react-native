import { useMemo } from 'react';
import { Box, Text } from '../components';
import type { IsolatedLayoutProps } from '../types';
import { ActionContent } from './ActionContent';
import { ActionForm } from './ActionForm';

export const IsolatedBlinkLayout = ({
  success,
  error,
  ...props
}: IsolatedLayoutProps) => {
  const element = useMemo(() => {
    if (props.elementType === 'form') {
      return { form: props.element };
    }

    if (props.elementType === 'button') {
      return { buttons: [props.element] };
    }

    if (props.elementType === 'input') {
      return { inputs: [props.element] };
    }

    return {};
  }, [props.element, props.elementType]);

  return (
    <Box width="100%">
      {element.form ? (
        <ActionForm form={element.form} />
      ) : (
        <ActionContent inputs={element.inputs} buttons={element.buttons} />
      )}
      {success && (
        <Text mt="gap" color="textSuccess" variant="caption" textAlign="center">
          {success}
        </Text>
      )}
      {error && !success && (
        <Text mt="gap" color="textError" variant="caption" textAlign="center">
          {error}
        </Text>
      )}
    </Box>
  );
};
