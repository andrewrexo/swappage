import { SwapWidget, SwapWidgetProps } from './widgets/swap/swap-widget';

export default function Home() {
  const widgetOpts: SwapWidgetProps = {
    width: '320px',
    height: '440px',
    theme: 'light',
    backgroundColor: 'white',
    textColor: 'black',
    assetMode: 'input',
    ratesMode: 'fixed',
    assetDiscovery: 'enabled',
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* todo: add root / home page */}
      <SwapWidget {...widgetOpts} />
    </main>
  );
}
