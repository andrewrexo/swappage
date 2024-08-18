export interface Order {
  orderId: string;
  provider: string;
  from: string;
  fromNetwork: string;
  fromAmount: number;
  fromAddress: string;
  to: string;
  toNetwork: string;
  toAddress: string;
  toAmount: number;
  code: string;
  pair: string;
  rate: number;
  expiry: number;
  slippage: number;
  created: number;
  updated: number;
  status: string;
  txId: string;
  txUrl: string;
  payinAddress: string;
}

export type LazyOrder = Partial<Order>;

const SIMPLE_STATUSES = [
  'created',
  'waiting',
  'failed',
  'expired',
  'confirmed',
  'exchanging',
  'completed',
] as const;

export type SwapStatus = (typeof SIMPLE_STATUSES)[number];
