# @dialectlabs/blinks-react-native

React Native SDK for rendering blinks for Solana Actions on mobile dApps. Check out our [documentation](https://docs.dialect.to) for more information on what actions and blinks are and how to build them.

## Installation

```console
# npm 
npm i @dialectlabs/blinks @dialectlabs/blinks-react-native

#yarn
yarn add @dialectlabs/blinks @dialectlabs/blinks-react-native
```

## Adding the Blink Component

The following imports need to be made to simplify the blink integration:
- `useAction` hook and `ActionAdapter` type from `@dialectlabs/blinks-react-native`
- `Blink` component from `@dialectlabs/blinks-react-native`

A `getWalletAdapter` function has to be defined to generate an adapter of type `ActionAdapter` for interactions with user wallets like wallet connect and signing transactions through the React Native dApp.

After that, the `Blink` component can be used in the React Native dApp to render the blink. It takes the following props:
- `theme` - has the styling for the blink to be rendered
- `action` - object returned by the `useAction` function (which requires the adapter from `getWalletAdapter` and Action URL)
- `website` - the complete URL of the Action
- `websiteText` - The domain name of the Action URL

An [example](/example/src/Example.tsx) of this is:

```js
    import {
      Blink,
      BlockchainIds,
      useAction,
      createSignMessageText,
      type ActionAdapter,
    } from '@dialectlabs/blinks-react-native';
    import { PublicKey } from '@solana/web3.js';
    import type React from 'react';

    function getWalletAdapter(): ActionAdapter {
      return {
        connect: async (_context) => {
          console.log('connect');
          return PublicKey.default.toString();
        },
        signTransaction: async (_tx, _context) => {
          console.log('signTransaction');
          return {
            signature: 'signature',
          };
        },
        confirmTransaction: async (_signature, _context) => {
          console.log('confirmTransaction');
        },
        signMessage: async (message: string | SignMessageData, _context) => {
          const messageToSign =
            typeof message === 'string' ? message : createSignMessageText(message);
          console.log('signMessage', messageToSign);
          return { signature: 'signature' };
        },
        metadata: { supportedBlockchainIds: [BlockchainIds.SOLANA_MAINNET] },
      };
    }

    export const BlinkInTheWalletIntegrationExample: React.FC<{
      url: string; // could be action api or website url
    }> = ({ url }) => {
      const adapter = getWalletAdapter();
      const { action } = useAction({ url, adapter });

      if (!action) {
        // return placeholder component
      }
      const actionUrl = new URL(url);
      return (
          <Blink
          theme={{
              '--blink-button': '#1D9BF0',
              '--blink-border-radius-rounded-button': 9999,
              // and any other custom styles
          }}
          action={action}
          websiteUrl={actionUrl.href}
          websiteText={actionUrl.hostname}
          />
      );
    };
```

## Customizing Blink Styles

The blink styles can be customized by passing a `theme` prop to the `Blink` component. The theme object can include any properties you'd like to override from the default theme:

```js
{
    '--blink-bg-primary': '#ffffff',
    '--blink-bg-secondary': '#f2f3f5',
    '--blink-button': '#2a2a2b',
    '--blink-button-disabled': '#737373',
    '--blink-button-hover': '#323335',
    '--blink-button-success': '#09cbbf1a',
    '--blink-icon-error': '#f71a05',
    '--blink-icon-error-hover': '#ff402e',
    '--blink-icon-primary': '#737373',
    '--blink-icon-primary-hover': '#888989',
    '--blink-icon-warning': '#d55f00',
    '--blink-icon-warning-hover': '#ef6f08',
    '--blink-input-bg': '#ffffff',
    '--blink-input-bg-disabled': '#dee1e7',
    '--blink-input-bg-selected': '#08c0b4',
    '--blink-input-stroke': '#c4c6c8',
    '--blink-input-stroke-disabled': '#dee1e7',
    '--blink-input-stroke-error': '#ff402e',
    '--blink-input-stroke-hover': '#b3b3b3',
    '--blink-input-stroke-selected': '#08c0b4',
    '--blink-stroke-error': '#ff9696',
    '--blink-stroke-primary': '#d7d7d7',
    '--blink-stroke-secondary': '#ebebeb',
    '--blink-stroke-warning': '#ffbc6e',
    '--blink-text-brand': '#08c0b4',
    '--blink-text-button': '#ffffff',
    '--blink-text-button-disabled': '#f2f3f5',
    '--blink-text-button-success': '#00a095',
    '--blink-text-error': '#f71a05',
    '--blink-text-error-hover': '#ff402e',
    '--blink-text-input': '#232324',
    '--blink-text-input-disabled': '#b3b3b3',
    '--blink-text-input-placeholder': '#737373',
    '--blink-text-link': '#737373',
    '--blink-text-link-hover': '#888989',
    '--blink-text-primary': '#232324',
    '--blink-text-secondary': '#434445',
    '--blink-text-success': '#00a095',
    '--blink-text-warning': '#d55f00',
    '--blink-text-warning-hover': '#ef6f08',
    '--blink-transparent-error': '#ff96961a',
    '--blink-transparent-grey': '#b3b3b31a',
    '--blink-transparent-warning': '#ffbc6e1a',

    '--blink-border-radius-rounded-lg': 4,
    '--blink-border-radius-rounded-xl': 8,
    '--blink-border-radius-rounded-2xl': 16,
    '--blink-border-radius-rounded-button': 8,
    '--blink-border-radius-rounded-input': 8,
    '--blink-border-radius-rounded-input-standalone': 8,
}
```
