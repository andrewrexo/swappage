import { AssetIcon } from '../../components/asset-icon';
import { TokenIcon } from '../../components/ui/token-icon';

const networks = {
  solana: {
    icon: (size: number) => <AssetIcon asset={{ symbol: 'SOL' }} size={size} />,
    label: 'Solana',
    symbol: 'SOL',
  },
  ethereum: {
    icon: (size: number) => <AssetIcon asset={{ symbol: 'ETH' }} size={size} />,
    label: 'Ethereum',
    symbol: 'ETH',
  },
} as const;

export type SupportedNetwork = keyof typeof networks;

export default networks;
