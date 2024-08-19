import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

export const projectId = 'e3a25383716ba18636fd724630e85225';

const metadata = {
  name: 'Swappage Dev',
  description:
    'Swappage securely connects you to the best swap providers across crypto. We offer frictionless swaps across multiple chains and aggregate the best rates for you.',
  url: 'https://swappage.vercel.app', // origin must match your domain & subdomain
  icons: ['https://cdn-icons-png.flaticon.com/512/146/146130.png'],
};

const chains = [mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
