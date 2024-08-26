import getAvailableAssets, {
  SUPPORTED_NETWORKS,
} from '@/lib/widget/lib/exodus/asset';
import { getRateByPairIdSwappage } from '@/lib/widget/lib/rates';
import SwapWidgetHome from '../../lib/widget/features/swap/widget';
import { SupportedNetwork } from '@/lib/widget/features/assets/network';

export default async function SwapPage() {
  const [assets, rate] = await Promise.all([
    getAvailableAssets([...SUPPORTED_NETWORKS] as SupportedNetwork[], {
      limit: '25',
      page: '1',
      query: '',
    }),
    getRateByPairIdSwappage('SOL_ETH'),
  ]);

  return <SwapWidgetHome assets={assets} freshRate={rate} />;
}
