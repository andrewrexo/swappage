import { authenticationHeaders, exodusApiUrl } from './config';

const SUPPORTED_NETWORKS = [
  'solana',
  'ethereum',
  'arbitrum',
  'basemainnet',
] as const;

export type SupportedNetwork = (typeof SUPPORTED_NETWORKS)[number];

export interface ExodusAsset {
  from: string;
  to: string;
  id: string;
  network: string;
  symbol: string;
}

const getAvailableAssets = async (networks: SupportedNetwork[]) => {
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

  // TODO: use next env variables to determine if staging or production
  const response = await fetch(
    `${exodusApiUrl.staging}assets?networks=${validatedNetworks.join(',')}`,
    {
      headers: {
        ...authenticationHeaders,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Request to Exodus Exchange rates API failed: ${response.status}`,
    );
  }

  const assets = await response.json();

  if (!Array.isArray(assets)) {
    throw new Error('Invalid response from Exodus Exchange rates API');
  }

  return assets;
};

export default getAvailableAssets;
