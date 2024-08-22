import { TokenSOL, TokenETH } from '@web3icons/react';

const networks = {
  solana: {
    icon: (size: number) => <TokenSOL size={size} variant="branded" />,
    label: 'Solana',
    symbol: 'SOL',
  },
  ethereum: {
    icon: (size: number) => <TokenETH size={size} variant="branded" />,
    label: 'Ethereum',
    symbol: 'ETH',
  },
} as const;

export type SupportedNetwork = keyof typeof networks;

export default networks;
