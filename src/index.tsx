import { ThemeProvider } from '@shopify/restyle';
import theme from './ui/theme';
import ActionLayout from './ui/ActionLayout';
import React, { ComponentProps } from 'react';
import { Blink as BlinkReact } from '@dialectlabs/blinks';

export const Blink = (props: ComponentProps<typeof BlinkReact>) => {
  return (
    <ThemeProvider theme={theme}>
      <BlinkReact {...props} Experimental__ActionLayout={ActionLayout} />
    </ThemeProvider>
  );
};
