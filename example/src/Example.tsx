import {
  Blink,
  BlockchainIds,
  createSignMessageText,
  Miniblink,
  useAction,
  type ActionAdapter,
  type SignMessageData,
} from '@dialectlabs/blinks-react-native';
import { PublicKey } from '@solana/web3.js';
import type React from 'react';
import { ActivityIndicator } from 'react-native';

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
    signMessage: async (message: string | SignMessageData, _context) => {
      const messageToSign =
        typeof message === 'string' ? message : createSignMessageText(message);
      console.log('signMessage', messageToSign);
      return { signature: 'signature' };
    },
    confirmTransaction: async (_signature, _context) => {
      console.log('confirmTransaction');
    },
    metadata: { supportedBlockchainIds: [BlockchainIds.SOLANA_MAINNET] },
  };
}

export const BlinkExample: React.FC<{
  url: string; // could be action api or website url
}> = ({ url }) => {
  const adapter = getWalletAdapter();
  const { action } = useAction({ url });

  if (!action) {
    return <ActivityIndicator />;
  }
  const actionUrl = new URL(url);
  return (
    <Blink
      theme={{
        '--blink-button': '#1D9BF0',
        '--blink-border-radius-rounded-button': 9999,
      }}
      action={action}
      adapter={adapter}
      websiteUrl={actionUrl.href}
      websiteText={actionUrl.hostname}
    />
  );
};

export const MiniblinkExample: React.FC<{
  url: string; // could be action api or website url
}> = ({ url }) => {
  const adapter = getWalletAdapter();
  const { action } = useAction({ url });

  if (!action) {
    return <ActivityIndicator />;
  }

  return (
    <Miniblink
      action={action}
      adapter={adapter}
      selector={(currentAction) =>
        currentAction.actions.find((a) => a.label === 'Donate')!
      }
    />
  );
};
