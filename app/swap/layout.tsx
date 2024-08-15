import widgetOpts from '@/lib/widget';
import { SwapWidget } from '../widgets/swap/swap-widget';
import type { ReactNode } from 'react';

export default function SwapLayout({ children }: { children: ReactNode }) {
  return <SwapWidget {...widgetOpts}>{children}</SwapWidget>;
}
