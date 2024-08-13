import { twMerge } from 'tailwind-merge';
import { SwapWidget, SwapWidgetProps } from './widgets/swap/swap-widget';

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
    <main
      className={twMerge(
        'flex min-h-screen flex-col items-center justify-between',
        `p-8 sm:p-24`,
      )}
    >
      {/* todo: add root / home page */}
      <SwapWidget {...widgetOpts} />
    </main>
  );
}
