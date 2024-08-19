'use client';

import React, { ReactNode } from 'react';
import { config, projectId } from '@/lib/config';
import { createWeb3Modal } from '@web3modal/wagmi/react';

import { State, WagmiProvider } from 'wagmi';

if (!projectId) throw new Error('Project ID is not defined');

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}
