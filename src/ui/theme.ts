import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { spacing } from './theme/spacing';
import { toThemeVars } from './theme/util';
import { dialLight } from './theme/dialLight';
import { textVariants } from './theme/textVariants';

export const getTheme = (themeVars) =>
  createTheme({
    colors: themeVars.colors,
    borderRadii: {
      ...themeVars.borderRadii,
      full: 9999,
    },
    spacing: spacing,
    textVariants: textVariants,
  });

const defaultThemeVars = toThemeVars(dialLight);

const defaultTheme = createTheme({
  colors: defaultThemeVars.colors,
  borderRadii: {
    ...defaultThemeVars.borderRadii,
    full: 9999,
  },
  spacing: spacing,
  textVariants: textVariants,
});

export type Theme = typeof defaultTheme;
export const useTheme = () => useRestyleTheme<Theme>();
