export interface Order {
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
  created: number;
  updated: number;
  status: string;
  txId: string;
  txUrl: string;
}

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
