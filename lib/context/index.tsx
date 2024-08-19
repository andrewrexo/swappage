'use client';

import { ReactNode } from 'react';
import EthereumProvider from './ethereum';
import SolanaProvider from './solana';

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <EthereumProvider>
      <SolanaProvider>{children}</SolanaProvider>
    </EthereumProvider>
  );
}
