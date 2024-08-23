'use server';
import { SwapWidget } from '../lib/widget/swap-widget';
import SwapWidgetHome from '../lib/widget/features/swap/widget';
import type { SwapWidgetProps } from '../lib/widget/swap-widget';
import getAvailableAssets, {
  SUPPORTED_NETWORKS,
  type SupportedNetwork,
} from '@/lib/widget/lib/exodus/asset';
import { getRateByPairIdSwappage } from '@/lib/widget/lib/rates';

export default async function Home() {
  const assets = await getAvailableAssets([
    ...SUPPORTED_NETWORKS,
  ] as SupportedNetwork[]);

  const rate = await getRateByPairIdSwappage('SOL_ETH', '');

  const widgetOpts: SwapWidgetProps = {
    width: '440px',
    height: '420px',
    theme: 'light',
    backgroundColor: 'white',
    textColor: 'black',
    assetMode: 'input',
    ratesMode: 'fixed',
    assetDiscovery: 'enabled',
    className: '',
  };

  return (
    <SwapWidget {...widgetOpts} freshRate={rate}>
      <SwapWidgetHome assets={assets} freshRate={rate} />
    </SwapWidget>
  );
}
