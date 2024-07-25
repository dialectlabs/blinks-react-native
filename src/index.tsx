import { Blink as BlinkReact } from '@dialectlabs/blinks';
import { ThemeProvider } from '@shopify/restyle';
import { type ComponentProps } from 'react';
import ActionLayout from './ui/ActionLayout';
import { getTheme } from './ui/theme';

export type ThemeVars = Record<string, string | number>;
export const Blink = (
  props: ComponentProps<typeof BlinkReact> & { theme?: ThemeVars },
) => {
  return (
    <ThemeProvider theme={getTheme(props.theme)}>
      <BlinkReact {...props} Experimental__ActionLayout={ActionLayout} />
    </ThemeProvider>
  );
};
