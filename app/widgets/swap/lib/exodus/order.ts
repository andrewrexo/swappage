import { authenticatedExodusRequest } from './fetch';

export const DEFAULT_SLIPPAGE = 0.5;

export interface XOSwapOrder {
  from: string;
  fromAmount: number;
  fromAddress: string;
  to: string;
  toAddress: string;
  toAmount: number;
  slippage?: number;
}

export type XOSwapOrderRequest = XOSwapOrder & {
  ip?: string;
};

export const createOrder = async ({ ...orderParams }: XOSwapOrderRequest) => {
  const { ip, ...order } = orderParams;

  if (!order.from || !order.to || !order.fromAmount || !order.toAmount) {
    throw new Error('Missing required order parameters');
  }

  if (order.fromAmount <= 0 || order.toAmount <= 0) {
    throw new Error('Invalid amount: must be greater than 0');
  }

  if (order.slippage && (order.slippage < 0 || order.slippage > 100)) {
    throw new Error('Invalid slippage: must be between 0 and 100');
  }

  const orderRequest = authenticatedExodusRequest(
    'v3/orders',
    'POST',
    order,
    ip,
  );

  const response = await fetch(orderRequest);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const orderResponse = await response.json();

  if (!orderResponse || typeof orderResponse !== 'object') {
    throw new Error('Invalid response from server');
  }

  return orderResponse;
};
