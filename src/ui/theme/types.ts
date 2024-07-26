import { spacing } from './spacing';
import { textVariants } from './textVariants';

export interface ThemeVars {
  '--blink-bg-primary': string;
  '--blink-button': string;
  '--blink-button-disabled': string;
  '--blink-button-success': string;
  '--blink-icon-error': string;
  '--blink-icon-primary': string;
  '--blink-icon-warning': string;
  '--blink-input-bg': string;
  '--blink-input-stroke': string;
  '--blink-input-stroke-disabled': string;
  '--blink-input-stroke-error': string;
  '--blink-input-stroke-selected': string;
  '--blink-stroke-error': string;
  '--blink-stroke-primary': string;
  '--blink-stroke-secondary': string;
  '--blink-stroke-warning': string;
  '--blink-text-brand': string;
  '--blink-text-button': string;
  '--blink-text-button-disabled': string;
  '--blink-text-button-success': string;
  '--blink-text-error': string;
  '--blink-text-input': string;
  '--blink-text-input-disabled': string;
  '--blink-text-input-placeholder': string;
  '--blink-text-link': string;
  '--blink-text-primary': string;
  '--blink-text-secondary': string;
  '--blink-text-success': string;
  '--blink-text-warning': string;
  '--blink-transparent-error': string;
  '--blink-transparent-grey': string;
  '--blink-transparent-warning': string;

  '--blink-border-radius-rounded-lg': number;
  '--blink-border-radius-rounded-xl': number;
  '--blink-border-radius-rounded-2xl': number;
  '--blink-border-radius-rounded-button': number;
  '--blink-border-radius-rounded-input': number;
}

export type ColorVars = {
  bgPrimary: string;
  button: string;
  buttonDisabled: string;
  buttonSuccess: string;
  iconError: string;
  iconPrimary: string;
  iconWarning: string;
  inputBg: string;
  inputStroke: string;
  inputStrokeDisabled: string;
  inputStrokeError: string;
  inputStrokeSelected: string;
  strokeError: string;
  strokePrimary: string;
  strokeSecondary: string;
  strokeWarning: string;
  textBrand: string;
  textButton: string;
  textButtonDisabled: string;
  textButtonSuccess: string;
  textError: string;
  textInput: string;
  textInputDisabled: string;
  textInputPlaceholder: string;
  textLink: string;
  textPrimary: string;
  textSecondary: string;
  textSuccess: string;
  textWarning: string;
  transparentError: string;
  transparentGrey: string;
  transparentWarning: string;
};
export type BorderRadiiVars = {
  lg: number;
  xl: number;
  '2xl': number;
  button: number;
  input: number;
  full: number;
};

export type SpacingVars = typeof spacing;
export type TextVariantsVars = typeof textVariants;
