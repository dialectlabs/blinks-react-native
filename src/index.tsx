import { ThemeProvider } from '@shopify/restyle';
import { getTheme } from './ui/theme';
import ActionLayout from './ui/ActionLayout';
import React, { ComponentProps } from 'react';
import { Blink as BlinkReact } from '@dialectlabs/blinks';
import { toThemeVars } from './ui/theme/util';
import { dialLight } from './ui/theme/dialLight';

export type ThemeVars = Record<string, string | number>;
export const Blink = (
  props: ComponentProps<typeof BlinkReact> & { theme?: ThemeVars }
) => {
  return (
    <ThemeProvider
      theme={getTheme(toThemeVars({ ...dialLight, ...props.theme }))}
    >
      <BlinkReact {...props} Experimental__ActionLayout={ActionLayout} />
    </ThemeProvider>
  );
};
