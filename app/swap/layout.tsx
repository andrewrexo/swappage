import widgetOpts from '@/lib/widget/config';
import { SwapWidget } from '../../lib/widget/swap-widget';
import type { ReactNode } from 'react';

export default function SwapLayout({ children }: { children: ReactNode }) {
  return <SwapWidget {...widgetOpts}>{children}</SwapWidget>;
}
