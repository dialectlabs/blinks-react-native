import {
  BlinkContainer,
  type BaseBlinkLayoutProps,
  type BlinkContainerProps,
} from '@dialectlabs/blinks-core';

import { ThemeProvider } from '@shopify/restyle';

import ActionLayout from './ActionLayout';
import { useLayoutPropNormalizer } from './hooks/useLayoutPropNormalizer';
import { getTheme, type ThemeVars } from './theme';

export type BlinkProps = Omit<BlinkContainerProps, 'Layout' | 'selector'> & {
  theme?: Partial<ThemeVars>;
};

const Layout = (props: BaseBlinkLayoutProps) => {
  const normalizedProps = useLayoutPropNormalizer(props);
  return <ActionLayout {...normalizedProps} />;
};

export const Blink = (props: BlinkProps) => {
  const theme = getTheme(props.theme);
  return (
    <ThemeProvider theme={theme}>
      <BlinkContainer {...props} Layout={Layout} />
    </ThemeProvider>
  );
};
