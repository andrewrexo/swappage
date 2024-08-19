import { createClient } from '@/lib/supabase/server';
import { SwapMonitorWidget } from '@/lib/widget/features/swap-monitor/widget';
import { dbOrderToLazyOrder } from '@/lib/widget/features/swap/api';

export default async function SwapPage({
  params,
}: {
  params: { order_id: string };
}) {
  const { order_id } = params;

  const supabase = createClient();
  const { data: order } = await supabase
    .from('swaps')
    .select('*')
    .eq('order_id', order_id);

  if (!order || order.length === 0) {
    return <div>Order not found</div>;
  }

  // todo: validate order before blindly converting & returning

  const lazyOrder = dbOrderToLazyOrder(order[0]);

  return <SwapMonitorWidget order={lazyOrder} />;
}
