import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { dialLight } from './dialLight';
import { spacing } from './spacing';
import { textVariants } from './textVariants';
import type {
  BorderRadiiVars,
  ColorVars,
  DefaultSpacingVars,
  SpacingVars,
  TextVariantsVars,
  ThemeVars,
} from './types';
import { toThemeVars } from './util';

const defaultVars = dialLight;

export const getTheme = (vars?: Partial<ThemeVars>) => {
  const themeVars = toThemeVars({ ...defaultVars, ...vars });
  return createTheme({
    colors: themeVars.colors,
    borderRadii: {
      ...themeVars.borderRadii,
      full: 9999,
    },
    spacing: { ...themeVars.spacing, ...spacing },
    textVariants: textVariants,
  });
};

export type Theme = {
  colors: ColorVars;
  spacing: SpacingVars & DefaultSpacingVars;
  textVariants: TextVariantsVars;
  borderRadii: BorderRadiiVars;
};

export const useTheme = () => useRestyleTheme<Theme>();
export type {
  BorderRadiiVars,
  ColorVars,
  DefaultSpacingVars,
  SpacingVars,
  TextVariantsVars,
  ThemeVars,
};
