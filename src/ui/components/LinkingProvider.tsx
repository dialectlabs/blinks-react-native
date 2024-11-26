import { createContext, type PropsWithChildren, useContext } from 'react';
import { Linking } from 'react-native';

interface LinkingProviderValue {
  openUrl: (url: string) => void;
}

interface LinkingProviderProps {
  // Atomic operation
  openUrl?: (url: string) => void;
}

const DEFAULT_OPEN_URL = (url: string) => Linking.openURL(url);

export const LinkingContext = createContext<LinkingProviderValue>({
  openUrl: DEFAULT_OPEN_URL,
});

export const LinkingProvider = ({
  openUrl,
  children,
}: PropsWithChildren<LinkingProviderProps>) => {
  return (
    <LinkingContext.Provider value={{ openUrl: openUrl ?? DEFAULT_OPEN_URL }}>
      {children}
    </LinkingContext.Provider>
  );
};

export const useLinking = () => {
  return useContext(LinkingContext);
};
