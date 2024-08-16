import { SwapWidget, SwapWidgetProps } from '../lib/widgets/swap/swap-widget';
import SwapWidgetHome from '../lib/widgets/swap/features/swap/widget';

export default function Home() {
  const widgetOpts: SwapWidgetProps = {
    width: '480px',
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
