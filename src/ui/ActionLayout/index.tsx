import React from 'react';
import { Image } from 'react-native';
import { Box, Text } from '../index';
import { Link } from '../components';
import { ActionButton } from './ActionButton';
import { ActionInput } from './ActionInput';
import { ActionForm } from './ActionForm';
import { Header } from './Header';
import { DisclaimerBlock } from './DisclaimerBlock';
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
    <Box>
      <Box
        overflow="hidden"
        width="100%"
        borderWidth={1}
        borderRadius="2xl"
        borderColor="stroke-primary"
        backgroundColor="bg-primary"
        // className="shadow-action" TODO shadow?
      >
        {image && (
          <Link url={websiteUrl}>
            <Image
              style={{
                width: '100%',
                aspectRatio: 1,
              }}
              resizeMode="cover"
              aspectRatio={1}
              source={{
                uri: image,
              }}
            />
          </Link>
        )}
        <Box flexDirection="column" p={4}>
          <Header
            websiteText={websiteText}
            websiteUrl={websiteUrl}
            type={type}
          />
          <Text mb={0.5} variant="text" fontWeight="600" color="text-primary">
            {title}
          </Text>
          <Text mb={3} variant="subtext" color="text-secondary">
            {description}
          </Text>

          {disclaimer && ( //TODO ???
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
            <Text
              mt={3}
              color="text-success"
              variant="caption"
              textAlign="center"
            >
              {success}
            </Text>
          )}
          {error && !success && (
            <Text
              mt={3}
              color="text-error"
              variant="caption"
              textAlign="center"
            >
              {error}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const ActionContent = ({
  form,
  inputs,
  buttons,
}: Pick<LayoutProps, 'form' | 'buttons' | 'inputs'>) => {
  if (form) {
    return <ActionForm form={form} />;
  }

  return (
    <Box flexDirection="column" gap={3}>
      {buttons && buttons.length > 0 && (
        <Box flexDirection="row" flexWrap="wrap" alignItems="center" gap={2}>
          {buttons?.map((it, index) => (
            <Box
              key={index}
              flexGrow={1}
              flexBasis={'27%'} //TODO calculate width
              // className="flex flex-grow basis-[calc(33.333%-2*4px)]"
            >
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
