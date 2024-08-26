import { swapApiUrl } from '@/lib/util';
import { PairRate } from './exodus/rate';

export const getRateByPairIdSwappage = async (pairId: string) => {
  if (!pairId.includes('_')) {
    throw new Error(
      'Invalid pairId, pairId must be in the format of assetId_assetId',
    );
  }

  const requestEndpoint = `${swapApiUrl}/rates/${pairId}`;
  const response = await fetch(requestEndpoint);

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
