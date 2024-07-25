import { Blink, type ActionAdapter } from '@dialectlabs/blinks';
import { useAction } from '@dialectlabs/blinks/react';
import { PublicKey } from '@solana/web3.js';
import type React from 'react';
import { ActivityIndicator } from 'react-native';

function getWalletAdapter(): ActionAdapter {
  return {
    connect: async (context) => {
      console.log('connect');
      return PublicKey.default.toString();
    },
    signTransaction: async (tx, context) => {
      console.log('signTransaction');
      return {
        signature: 'signature',
      };
    },
    confirmTransaction: async (signature, context) => {
      console.log('confirmTransaction');
    },
  };
}

export const BlinkInTheWalletIntegrationExample: React.FC<{
  url: string; // could be action api or website url
}> = ({ url }) => {
  const adapter = getWalletAdapter();
  const { action } = useAction({ url, adapter });

  if (!action) return <ActivityIndicator />;

  return <Blink action={action} />;
};
