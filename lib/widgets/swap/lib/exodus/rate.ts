import { swapApiUrl } from '@/lib/util';
import { authenticatedExodusRequest } from './fetch';

export interface AssetValue {
  assetId: string;
  value: number;
}

export interface PairRate {
  amount: AssetValue;
  expiry: number;
  rateId: string;
  max: AssetValue;
  min: AssetValue;
  pairId: string;
  minerFee: AssetValue;
  features: string[];
  fromAssetFiat: number;
  toAssetFiat: number;
}

interface UserProperties {
  ip: string;
  device: string;
}

const getRateByPairId = async (pairId: string, ip: string) => {
  if (!pairId.includes('_')) {
    throw new Error(
      'Invalid pairId, pairId must be in the format of assetId_assetId',
    );
  }

  const request = await authenticatedExodusRequest(
    `v3/pairs/${pairId}/rates`,
    'GET',
    {
      ip,
    },
  );

  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch rate for pairId: ${pairId}. ${response.url}`,
    );
  }

  const data: PairRate[] = await response.json();

  if (Array.isArray(data)) {
    return data[0];
  }

  return data;
};

export const getRateBulk = async ({
  pairIds,
  userProperties,
}: {
  pairIds: string[];
  userProperties: UserProperties;
}) => {
  if (pairIds.length === 0) {
    return [];
  }

  const pairIdsString = pairIds.join(',');
  const { ip = '69.69.69.69' } = userProperties;

  const request = await authenticatedExodusRequest(`v3/rates`, 'GET', {
    ip,
  });

  const response = await fetch(request, { next: { revalidate: 5 } });

  if (!response.ok) {
    throw new Error(`Failed to fetch rate from Exodus API(${request.url})`);
  }

  const rates = await response.json();

  if (Array.isArray(rates)) {
    return rates;
  }

  return [];
};

export default getRateByPairId;
