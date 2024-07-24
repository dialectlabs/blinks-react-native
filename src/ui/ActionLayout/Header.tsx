import { Box, Text } from '../index';
import { ExclamationShieldIcon, InfoShieldIcon, LinkIcon } from '../icons';
import theme from '../theme';
import { Badge, Link } from '../components';
import React from 'react';
import type { ActionType } from './types';

export const Header = ({
  websiteUrl,
  websiteText,
  type,
}: {
  websiteUrl: string | null | undefined;
  websiteText: string | null | undefined;
  type: ActionType;
}) => {
  return (
    <Box flexDirection={'row'} gap={4} alignItems="center" mb={1}>
      {websiteUrl && (
        <Link
          flex={1}
          flexDirection="row"
          url={websiteUrl}
          gap={1}
          alignItems="center"
        >
          <LinkIcon color={theme.colors['icon-primary']} mr={2} />
          <Text color="text-link" variant="subtext" numberOfLines={1}>
            {websiteText ?? websiteUrl}
          </Text>
        </Link>
      )}
      {websiteText && !websiteUrl && (
        <Text color="text-link" variant="subtext" numberOfLines={1}>
          {websiteText}
        </Text>
      )}
      <Link
        flexDirection="row"
        alignItems="center"
        url="https://docs.dialect.to/documentation/actions/security"
      >
        {type === 'malicious' && (
          <Badge
            variant="error"
            icon={
              <ExclamationShieldIcon
                color={theme.colors['icon-error']}
                width={10}
                height={10}
              />
            }
          >
            Blocked
          </Badge>
        )}
        {type === 'trusted' && (
          <Badge
            variant="default"
            icon={
              <InfoShieldIcon
                color={theme.colors['icon-primary']}
                width={10}
                height={10}
              />
            }
          />
        )}
        {type === 'unknown' && (
          <Badge
            variant="warning"
            icon={
              <InfoShieldIcon
                color={theme.colors['icon-warning']}
                width={10}
                height={10}
              />
            }
          />
        )}
      </Link>
    </Box>
  );
};
