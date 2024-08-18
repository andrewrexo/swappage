import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/widgets/swap/lib/exodus/order';
import { createClient } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const {
      from,
      to,
      fromAddress,
      toAddress,
      fromAmount,
      toAmount,
      slippage = 0.5,
      pairId,
      rate,
    } = await request.json();

    if (
      !from ||
      !to ||
      !fromAddress ||
      !toAddress ||
      !fromAmount ||
      !toAmount ||
      !rate
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Create order payload
    const orderPayload = {
      from,
      to,
      fromAddress,
      toAddress,
      fromAmount,
      toAmount,
      slippage,
      pairId,
      rate,
    };

    console.info('Creating order:', { orderPayload });

    const order = await createOrder({
      ...orderPayload,
      ip: request.headers.get('X-Forwarded-For') || request.ip,
    });

    if (!order) {
      throw new Error('Failed to create order with provider');
    }

    // Connect to Supabase
    const supabase = createClient();

    const dbOrder = {
      order_id: uuidv4(),
      provider_order_id: order.id,
      from_asset: orderPayload.from,
      to_asset: orderPayload.to,
      amount_sent: orderPayload.fromAmount,
      amount_received: orderPayload.toAmount,
      amount_sent_usd: 0,
      amount_received_usd: 0,
      user_from_address: orderPayload.fromAddress,
      user_to_address: orderPayload.toAddress,
      payin_address: order.payInAddress,
      created: order.createdAt,
      last_update: order.updatedAt,
      rate: orderPayload.rate,
      status: 'pending',
      pair: orderPayload.pairId,
    };

    // Insert order into Supabase
    const { error } = await supabase.from('swaps').insert([dbOrder]).select();

    if (error) {
      throw new Error('Failed to save order in database', { cause: error });
    }

    console.info('Order created:', dbOrder);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error('Error creating order:', error);

    if (!error.message) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 },
      );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
