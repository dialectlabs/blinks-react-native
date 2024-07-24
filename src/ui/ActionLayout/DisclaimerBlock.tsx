import { Link, Snackbar } from '../components';
import { Box, Text } from '../index';
import React from 'react';
import { Button as NativeButton } from 'react-native';
import { DisclaimerType } from './types';

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
        <Text variant="subtext" color="text-error">
          This Action or it&apos;s origin has been flagged as an unsafe action,
          & has been blocked. If you believe this action has been blocked in
          error, please{' '}
          <Link url="https://discord.gg/saydialect">
            <Text fontStyle="underline">submit an issue</Text>
          </Link>
          .
          {!ignorable &&
            ' Your action provider blocks execution of this action.'}
        </Text>
        {ignorable && onSkip && (
          <Box mt={3}>
            <NativeButton onClick={onSkip} title={'Ignore warning & proceed'}>
              <Text fontWeight={600} variant="subtext" color="text-error">
                Ignore warning & proceed
              </Text>
            </NativeButton>
          </Box>
        )}
      </Snackbar>
    );
  }

  if (type === DisclaimerType.UNKNOWN) {
    return (
      <Snackbar variant="warning">
        <Text variant="subtext" color="text-warning">
          This Action has not yet been registered. Only use it if you trust the
          source. This Action will not unfurl on X until it is registered.
          {!ignorable &&
            ' Your action provider blocks execution of this action.'}
        </Text>
        <Link mt={3} url="https://discord.gg/saydialect">
          <Text fontWeight={600} variant="subtext" color="text-warning">
            Report
          </Text>
        </Link>
      </Snackbar>
    );
  }

  return null;
};