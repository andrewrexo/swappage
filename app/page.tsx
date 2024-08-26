'use server';
import { SwapWidget } from '../lib/widget/swap-widget';
import SwapWidgetHome from '../lib/widget/features/swap/widget';
import getAvailableAssets, {
  SUPPORTED_NETWORKS,
  type SupportedNetwork,
} from '@/lib/widget/lib/exodus/asset';
import { getRateByPairIdSwappage } from '@/lib/widget/lib/rates';
import widgetOpts from '@/lib/widget/config';

export default async function Home() {
  const [assets, rate] = await Promise.all([
    getAvailableAssets([...SUPPORTED_NETWORKS] as SupportedNetwork[], {
      limit: '25',
      page: '1',
      query: '',
    }),
    getRateByPairIdSwappage('SOL_ETH'),
  ]);

  return (
    <SwapWidget {...widgetOpts}>
      <SwapWidgetHome assets={assets} freshRate={rate} />
    </SwapWidget>
  );
}
