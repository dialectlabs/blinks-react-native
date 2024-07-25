import { Box, Text } from '../index';
import { ActionContent } from './ActionContent';
import { ActionForm } from './ActionForm';
import { ActionImage } from './ActionImage';
import { DisclaimerBlock } from './DisclaimerBlock';
import { Header } from './Header';
import type { LayoutProps } from './types';
import { DisclaimerType } from './types';

export const SOFT_LIMIT_TITLE_LENGTH = 80;

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
          {title.substring(0, SOFT_LIMIT_TITLE_LENGTH)}
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

        {form ? (
          <ActionForm form={form} />
        ) : (
          <ActionContent inputs={inputs} buttons={buttons} />
        )}

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

export default ActionLayout;
