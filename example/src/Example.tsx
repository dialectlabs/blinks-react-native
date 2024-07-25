import { useAction, type ActionAdapter } from '@dialectlabs/blinks';
import { Blink } from '@dialectlabs/blinks-react-native';
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
    confirmTransaction: async (_signature, _context) => {
      console.log('confirmTransaction');
    },
  };
}

export const BlinkInTheWalletIntegrationExample: React.FC<{
  url: string; // could be action api or website url
}> = ({ url }) => {
  const adapter = getWalletAdapter();
  const { action } = useAction({ url, adapter });

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
      websiteUrl={actionUrl.href}
      websiteText={actionUrl.hostname}
    />
  );
};
