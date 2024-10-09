import {
  type BaseBlinkLayoutProps,
  BlinkContainer,
  type BlinkContainerProps,
} from '@dialectlabs/blinks-core';

import { ThemeProvider } from '@shopify/restyle';

import { useIsolatedLayoutPropNormalizer } from './hooks/useIsolatedLayoutPropNormalizer';
import { IsolatedBlinkLayout } from './layout';
import { getTheme, type ThemeVars } from './theme';

export type MiniblinkProps = Omit<BlinkContainerProps, 'Layout'> & {
  theme?: Partial<ThemeVars>;
};

const Layout = (props: BaseBlinkLayoutProps) => {
  const normalizedProps = useIsolatedLayoutPropNormalizer(props);
  if (!normalizedProps) {
    console.warn(
      '[@dialectlabs/blinks-react-native] No `selector` prop provided for Miniblink',
    );
    return null;
  }
  return <IsolatedBlinkLayout {...normalizedProps} />;
};

export const Miniblink = (props: MiniblinkProps) => {
  const theme = getTheme(props.theme);
  return (
    <ThemeProvider theme={theme}>
      <BlinkContainer {...props} Layout={Layout} securityLevel="all" />
    </ThemeProvider>
  );
};
