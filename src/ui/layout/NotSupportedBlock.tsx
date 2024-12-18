import { Box, Text } from '../components';
import { GearsIcon } from '../icons';
import { useTheme } from '../theme';

export const NotSupportedBlock = ({ message }: { message: string }) => {
  const theme = useTheme();
  return (
    <Box
      p={3}
      backgroundColor="bgSecondary"
      borderRadius="xl"
      flexDirection="row"
      gap={2}
    >
      <GearsIcon color={theme.colors.iconPrimary} />
      <Box flexDirection="column" flex={1} gap={1}>
        <Text variant="subtext" color="textSecondary" fontWeight="600">
          This action is not supported
        </Text>
        <Text variant="subtext" color="textSecondary">
          {message}
        </Text>
      </Box>
    </Box>
  );
};
