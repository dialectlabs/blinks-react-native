import { Box, Link, SimpleMarkdown, Text } from '../components';
import { DialectLogo } from '../icons';
import { useTheme } from '../theme';
import type { LayoutProps } from '../types';
import { DisclaimerType } from '../types';
import { ActionContent } from './ActionContent';
import { ActionForm } from './ActionForm';
import { ActionImage } from './ActionImage';
import { DisclaimerBlock } from './DisclaimerBlock';
import { Header } from './Header';
import { NotSupportedBlock } from './NotSupportedBlock';

export const SOFT_LIMIT_TITLE_LENGTH = 80;

export const BlinkLayout = ({
  title,
  description,
  image,
  websiteUrl,
  websiteText,
  securityState,
  disclaimer,
  buttons,
  inputs,
  form,
  error,
  success,
  supportability,
}: LayoutProps) => {
  const theme = useTheme();
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

      <Box flexDirection="column" p="padding">
        <Header
          websiteText={websiteText}
          websiteUrl={websiteUrl}
          securityState={securityState}
        />

        <Text mb={1.5} variant="h3" fontWeight="600" color="textPrimary">
          {title.substring(0, SOFT_LIMIT_TITLE_LENGTH)}
        </Text>
        <Box mb="gap">
          {description && (
            <SimpleMarkdown text={description} baseColor="textSecondary" />
          )}
        </Box>

        {!supportability.isSupported ? (
          <NotSupportedBlock message={supportability?.message} />
        ) : (
          <>
            {disclaimer && (
              <Box mb="gap">
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
              <Text
                mt={3}
                color="textSuccess"
                variant="caption"
                textAlign="center"
              >
                {success}
              </Text>
            )}
            {error && !success && (
              <Text
                mt={3}
                color="textError"
                variant="caption"
                textAlign="center"
              >
                {error}
              </Text>
            )}
          </>
        )}
        <Box mt="gap" flex={1} alignItems="center">
          <Link
            gap={1}
            flexDirection="row"
            alignItems="center"
            url={'https://dialect.to'}
          >
            <Text variant="subtext" color="textLink">
              powered by
            </Text>
            <DialectLogo color={theme.colors.textLink} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
