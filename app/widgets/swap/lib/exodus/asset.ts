import { authenticatedExodusRequest } from './fetch';

export const SUPPORTED_NETWORKS = [
  'bitcoin',
  'monero',
  'solana',
  'ethereum',
  'arbitrumone',
  'basemainnet',
] as const;

export type SupportedNetwork = (typeof SUPPORTED_NETWORKS)[number];

export interface ExodusAsset {
  name: string;
  id: string;
  network: string;
  symbol: string;
}

export interface AssetQueryParams {
  limit?: string | null;
  page?: string | null;
  query?: string | null;
}

const getAvailableAssets = async (
  networks: SupportedNetwork[],
  { limit = '100', page = '1', query }: AssetQueryParams = {},
) => {
  const validatedNetworks = networks.filter(
    (network): network is SupportedNetwork =>
      SUPPORTED_NETWORKS.includes(network as SupportedNetwork),
  );

  if (validatedNetworks.length === 0) {
    throw new Error('No valid networks provided');
  }

  if (validatedNetworks.length !== networks.length) {
    // handle this case and do more than just log a warning to console
    console.warn(
      'Some provided networks were invalid and have been filtered out',
    );
  }

  let endpoint = `v3/assets?networks=${validatedNetworks.join(',')}&limit=${limit}&page=${page}`;

  if (query) {
    endpoint += `&query=${query}`;
  }

  const request = await authenticatedExodusRequest(endpoint, 'GET');
  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(
      `Request to Exodus Exchange API failed: ${response.status}`,
    );
  }

  const assets = await response.json();

  if (!Array.isArray(assets)) {
    throw new Error('Invalid response from Exodus Exchange rates API');
  }

  return assets;
};

export const demoAssets: ExodusAsset[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    network: 'BTC',
    name: 'Bitcoin',
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    network: 'ETH',
    name: 'Ethereum',
  },
];

export default getAvailableAssets;
