import { SwapWidget } from '../lib/widget/swap-widget';
import SwapWidgetHome from '../lib/widget/features/swap/widget';
import type { SwapWidgetProps } from '../lib/widget/swap-widget';

export default function Home() {
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
    <SwapWidget {...widgetOpts}>
      <SwapWidgetHome />
    </SwapWidget>
  );
}
