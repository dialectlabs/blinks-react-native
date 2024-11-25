import {
  BlinkContainer,
  type BaseBlinkLayoutProps,
  type BlinkContainerProps,
} from '@dialectlabs/blinks-core';

import { ThemeProvider } from '@shopify/restyle';

import { LinkingProvider } from './components/LinkingProvider';
import { useLayoutPropNormalizer } from './hooks/useLayoutPropNormalizer';
import { BlinkLayout } from './layout';
import { getTheme, type ThemeVars } from './theme';

export type BlinkProps = Omit<BlinkContainerProps, 'Layout' | 'selector'> & {
  theme?: Partial<ThemeVars>;
  openUrl?: (url: string) => void;
};

const Layout = (props: BaseBlinkLayoutProps) => {
  const normalizedProps = useLayoutPropNormalizer(props);
  return <BlinkLayout {...normalizedProps} />;
};

export const Blink = ({ openUrl, ...props }: BlinkProps) => {
  const theme = getTheme(props.theme);
  return (
    <ThemeProvider theme={theme}>
      <LinkingProvider openUrl={openUrl}>
        <BlinkContainer {...props} Layout={Layout} />
      </LinkingProvider>
    </ThemeProvider>
  );
};
