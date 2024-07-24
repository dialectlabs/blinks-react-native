import { createTheme } from '@shopify/restyle';
import { spacing } from './theme/spacing';
import { light } from './theme/colors';

const theme = createTheme({
  colors: light,
  spacing: spacing,
  borderRadii: {
    'lg': 4,
    'xl': 8,
    '2xl': 16,
    'button': 8,
    'input': 8,
    'full': 9999,
  },
  textVariants: {
    text: {
      fontSize: 15,
      lineHeight: 18,
    },
    subtext: {
      fontSize: 13,
      lineHeight: 16,
    },
    caption: {
      fontSize: 11,
      lineHeight: 14,
    },
    header: {
      fontWeight: 'bold',
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
});

export type Theme = typeof theme;
export default theme;
