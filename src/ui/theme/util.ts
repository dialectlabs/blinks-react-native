import { dialLight } from './dialLight';

export const defaultVars = dialLight;
const defaultThemeVars = toThemeVars(dialLight);

type RawVars = typeof defaultVars;
export type ColorVars = typeof defaultThemeVars.colors;
export type BorderRadiiVars = typeof defaultThemeVars.borderRadii;

export function toThemeVars(vars: RawVars) {
  return {
    colors: {
      bgPrimary: vars['--blink-bg-primary'],
      button: vars['--blink-button'],
      buttonDisabled: vars['--blink-button-disabled'],
      //  buttonHover: vars['--blink-button-hover'],
      buttonSuccess: vars['--blink-button-success'],
      iconError: vars['--blink-icon-error'],
      // iconErrorHover: vars['--blink-icon-error-hover'],
      iconPrimary: vars['--blink-icon-primary'],
      //  iconPrimaryHover: vars['--blink-icon-primary-hover'],
      iconWarning: vars['--blink-icon-warning'],
      // iconWarningHover: vars['--blink-icon-warning-hover'],
      inputBg: vars['--blink-input-bg'],
      inputStroke: vars['--blink-input-stroke'],
      // inputStrokeDisabled: vars['--blink-input-stroke-disabled'],
      // inputStrokeError: vars['--blink-input-stroke-error'],
      // inputStrokeHover: vars['--blink-input-stroke-hover'],
      // inputStrokeSelected: vars['--blink-input-stroke-selected'],
      strokeError: vars['--blink-stroke-error'],
      strokePrimary: vars['--blink-stroke-primary'],
      strokeSecondary: vars['--blink-stroke-secondary'],
      strokeWarning: vars['--blink-stroke-warning'],
      textBrand: vars['--blink-text-brand'],
      textButton: vars['--blink-text-button'],
      textButtonDisabled: vars['--blink-text-button-disabled'],
      textButtonSuccess: vars['--blink-text-button-success'],
      textError: vars['--blink-text-error'],
      //textErrorHover: vars['--blink-text-error-hover'],
      textInput: vars['--blink-text-input'],
      textInputDisabled: vars['--blink-text-input-disabled'],
      textInputPlaceholder: vars['--blink-text-input-placeholder'],
      textLink: vars['--blink-text-link'],
      // textLinkHover: vars['--blink-text-link-hover'],
      textPrimary: vars['--blink-text-primary'],
      textSecondary: vars['--blink-text-secondary'],
      textSuccess: vars['--blink-text-success'],
      textWarning: vars['--blink-text-warning'],
      // textWarningHover: vars['--blink-text-warning-hover'],
      transparentError: vars['--blink-transparent-error'],
      transparentGrey: vars['--blink-transparent-grey'],
      transparentWarning: vars['--blink-transparent-warning'],
    },
    borderRadii: {
      lg: vars['--blink-border-radius-rounded-lg'],
      xl: vars['--blink-border-radius-rounded-xl'],
      '2xl': vars['--blink-border-radius-rounded-2xl'],
      button: vars['--blink-border-radius-rounded-button'],
      input: vars['--blink-border-radius-rounded-input'],
    },
  };
}
