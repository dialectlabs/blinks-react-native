import {
  BlinkContainer,
  type BaseBlinkLayoutProps,
  type BlinkContainerProps,
} from '@dialectlabs/blinks-core';

import { ThemeProvider } from '@shopify/restyle';

import { useLayoutPropNormalizer } from './hooks/useLayoutPropNormalizer';
import { BlinkLayout } from './layout';
import { getTheme, type ThemeVars } from './theme';

export type BlinkProps = Omit<BlinkContainerProps, 'Layout' | 'selector'> & {
  theme?: Partial<ThemeVars>;
};

const Layout = (props: BaseBlinkLayoutProps) => {
  const normalizedProps = useLayoutPropNormalizer(props);
  return <BlinkLayout {...normalizedProps} />;
};

export const Blink = (props: BlinkProps) => {
  const theme = getTheme(props.theme);
  return (
    <ThemeProvider theme={theme}>
      <BlinkContainer {...props} Layout={Layout} />
    </ThemeProvider>
  );
};
