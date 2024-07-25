import { Badge, Link } from '../components';
import { ExclamationShieldIcon, InfoShieldIcon, LinkIcon } from '../icons';
import { Box, Text } from '../index';
import { useTheme } from '../theme';
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
  const theme = useTheme();
  return (
    <Box flexDirection="row" alignItems="center" mb={1} gap={1}>
      <Box flexShrink={1}>
        {websiteUrl && (
          <Link
            flexDirection="row"
            url={websiteUrl}
            gap={1}
            alignItems="center"
          >
            <LinkIcon color={theme.colors.iconPrimary} />
            <Text color="textLink" variant="subtext" numberOfLines={1}>
              {websiteText ?? websiteUrl}
            </Text>
          </Link>
        )}
        {websiteText && !websiteUrl && (
          <Text color="textLink" variant="subtext" numberOfLines={1}>
            {websiteText}
          </Text>
        )}
      </Box>
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
                color={theme.colors.iconError}
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
                color={theme.colors.iconPrimary}
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
                color={theme.colors.iconWarning}
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
