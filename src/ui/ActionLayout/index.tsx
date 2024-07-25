import { useState } from 'react';
import { Dimensions } from 'react-native';
import { Box, Text } from '../index';
import { ActionButton } from './ActionButton';
import { ActionForm } from './ActionForm';
import { ActionImage } from './ActionImage';
import { ActionInput } from './ActionInput';
import { DisclaimerBlock } from './DisclaimerBlock';
import { Header } from './Header';
import type { LayoutProps } from './types';
import { DisclaimerType } from './types';

const ActionLayout = ({
  title,
  description,
  image,
  websiteUrl,
  websiteText,
  type,
  disclaimer,
  buttons,
  inputs,
  form,
  error,
  success,
}: LayoutProps) => {
  return (
    <Box
      overflow="hidden"
      width="100%"
      borderWidth={1}
      borderRadius="2xl"
      borderColor="strokePrimary"
      backgroundColor="bgPrimary"
    >
      {image && <ActionImage imageUrl={image} websiteUrl={websiteUrl} />}
      <Box flexDirection="column" p={4}>
        <Header websiteText={websiteText} websiteUrl={websiteUrl} type={type} />
        <Text mb={0.5} variant="text" fontWeight="600" color="textPrimary">
          {title}
        </Text>
        <Text mb={3} variant="subtext" color="textSecondary">
          {description}
        </Text>

        {disclaimer && (
          <Box mb={3}>
            <DisclaimerBlock
              type={disclaimer.type}
              ignorable={disclaimer.ignorable}
              hidden={
                disclaimer.type === DisclaimerType.BLOCKED
                  ? disclaimer.hidden
                  : false
              }
              onSkip={
                disclaimer.type === DisclaimerType.BLOCKED
                  ? disclaimer.onSkip
                  : undefined
              }
            />
          </Box>
        )}
        <ActionContent form={form} inputs={inputs} buttons={buttons} />
        {success && (
          <Text mt={3} color="textSuccess" variant="caption" textAlign="center">
            {success}
          </Text>
        )}
        {error && !success && (
          <Text mt={3} color="textError" variant="caption" textAlign="center">
            {error}
          </Text>
        )}
      </Box>
    </Box>
  );
};

const ActionContent = ({
  form,
  inputs,
  buttons,
}: Pick<LayoutProps, 'form' | 'buttons' | 'inputs'>) => {
  const [maxWidth, setMaxWidth] = useState<number>(
    Dimensions.get('window').width / 4 - 8,
  );
  if (form) {
    return <ActionForm form={form} />;
  }

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

export default ActionLayout;
