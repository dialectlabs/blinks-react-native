import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { dialLight } from './theme/dialLight';
import { spacing } from './theme/spacing';
import { textVariants } from './theme/textVariants';
import type {
  BorderRadiiVars,
  ColorVars,
  SpacingVars,
  TextVariantsVars,
  ThemeVars,
} from './theme/types';
import { toThemeVars } from './theme/util';

const defaultVars = dialLight;

export const getTheme = (vars?: Partial<ThemeVars>) => {
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
  spacing: SpacingVars;
  textVariants: TextVariantsVars;
  borderRadii: BorderRadiiVars;
};
export const useTheme = () => useRestyleTheme<Theme>();
