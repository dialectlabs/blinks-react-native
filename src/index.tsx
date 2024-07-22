import { ThemeProvider } from '@shopify/restyle';
import { Box, Text } from './ui';
import theme from './ui/theme';

export const Blink = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Text variant="header">I am blink!</Text>
      </Box>
    </ThemeProvider>
  );
};
