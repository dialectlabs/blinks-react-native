import { Pressable } from 'react-native';
import { Box, Link, LinkText, Snackbar, Text } from '../components';
import { DisclaimerType } from '../types';

export const DisclaimerBlock = ({
  type,
  hidden,
  ignorable,
  onSkip,
}: {
  type: DisclaimerType;
  ignorable: boolean;
  onSkip?: () => void;
  hidden: boolean;
}) => {
  if (type === DisclaimerType.BLOCKED && !hidden) {
    return (
      <Snackbar variant="error">
        <Text variant="subtext" color="textError">
          This Action or it&apos;s origin has been flagged as an unsafe action,
          & has been blocked. If you believe this action has been blocked in
          error, please{' '}
          <LinkText
            textDecorationLine="underline"
            variant="subtext"
            color="textError"
            url="https://discord.gg/saydialect"
          >
            submit an issue
          </LinkText>
          .
          {!ignorable &&
            ' Your action provider blocks execution of this action.'}
        </Text>
        {ignorable && onSkip && (
          <Box mt={3}>
            <Pressable onPress={onSkip}>
              <Text fontWeight={600} variant="subtext" color="textError">
                Ignore warning & proceed
              </Text>
            </Pressable>
          </Box>
        )}
      </Snackbar>
    );
  }

  if (type === DisclaimerType.UNKNOWN) {
    return (
      <Snackbar variant="warning">
        <Text variant="subtext" color="textWarning">
          This Action has not yet been registered. Only use it if you trust the
          source.
          {!ignorable &&
            ' Your action provider blocks execution of this action.'}
        </Text>
        <Link mt={3} url="https://discord.gg/saydialect">
          <Text fontWeight={600} variant="subtext" color="textWarning">
            Report
          </Text>
        </Link>
      </Snackbar>
    );
  }

  return null;
};
