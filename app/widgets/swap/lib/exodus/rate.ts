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

const getRateByPairId = async (pairId: string, ip: string) => {
  const request = await authenticatedExodusRequest(
    `v3/pairs/${pairId}/rates`,
    'GET',
    { ip },
  );

  const response = await fetch(request);

  if (!response.ok) {
    throw new Error('Failed to fetch rate');
  }

  const data: PairRate[] = await response.json();

  if (Array.isArray(data)) {
    return data[0];
  }

  return data;
};

export default getRateByPairId;
