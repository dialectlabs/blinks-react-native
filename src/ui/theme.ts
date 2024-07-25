import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { spacing } from './theme/spacing';
import { textVariants } from './theme/textVariants';
import {
  type BorderRadiiVars,
  type ColorVars,
  defaultVars,
  toThemeVars,
} from './theme/util';

export const getTheme = (vars?: Record<string, string | number>) => {
  const themeVars = toThemeVars({ ...defaultVars, ...vars });
  return createTheme({
    colors: themeVars.colors,
    borderRadii: {
      ...themeVars.borderRadii,
      full: 9999,
    },
    spacing: spacing,
    textVariants: textVariants,
  });
};

export type Theme = {
  colors: ColorVars;
  spacing: typeof spacing;
  textVariants: typeof textVariants;
  borderRadii: BorderRadiiVars & { full: number };
};
export const useTheme = () => useRestyleTheme<Theme>();
