import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/app/widgets/swap/lib/exodus/order';

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
    } = await request.json();

    if (
      !from ||
      !to ||
      !fromAddress ||
      !toAddress ||
      !fromAmount ||
      !toAmount
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
    };

    const order = await createOrder({
      ...orderPayload,
      ip: request.headers.get('X-Forwarded-For') || request.ip,
    });

    if (!order) {
      return NextResponse.json(
        { error: order.error || 'Failed to create order' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
