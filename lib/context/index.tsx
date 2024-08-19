'use client';

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import React, { ReactNode } from 'react';
import { mainnet, polygon, optimism, arbitrum, base } from 'viem/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  trustWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
  phantomWallet,
  magicEdenWallet,
  rainbowWallet,
  safeWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { State, WagmiProvider } from 'wagmi';

export const config = getDefaultConfig({
  appName: 'Swappage',
  projectId: 'e3a25383716ba18636fd724630e85225',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        rainbowWallet,
        walletConnectWallet,
        metaMaskWallet,
        trustWallet,
        coinbaseWallet,
        injectedWallet,
        phantomWallet,
        magicEdenWallet,
        safeWallet,
      ],
    },
  ],
});

const queryClient = new QueryClient();

export default function Web3Provider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
