import { LazyOrder } from '../../lib/order';

export const dbOrderToLazyOrder = (order: any): LazyOrder => {
  return {
    from: order.from_asset,
    to: order.to_asset,
    fromAmount: order.amount_sent,
    toAmount: order.amount_received,
    created: order.created,
    updated: order.last_update,
    payinAddress: order.payin_address,
    status: order.status,
    orderId: order.order_id,
  };
};

const validateOrderData = (orderData: LazyOrder): boolean => {
  // better validation is needed.
  // zod would be a good first step for validation

  if (!orderData.fromAmount || !orderData.toAmount) {
    return false;
  }

  if (isNaN(orderData.fromAmount) || isNaN(orderData.toAmount)) {
    return false;
  }

  if (orderData.fromAmount <= 0 || orderData.toAmount <= 0) {
    return false;
  }

  if (orderData.from === orderData.to) {
    return false;
  }

  return true;
};

export const createOrderInternal = async (orderData: LazyOrder) => {
  // Validate orderData
  if (!validateOrderData(orderData)) {
    throw new Error('Invalid order data');
  }

  const response = await fetch('/api/swap/create', {
    method: 'POST',
    body: JSON.stringify({
      ...orderData,
      pairId: orderData.pair,
      ip: '69.69.69.69',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create order');
  }

  return response.json();
};

export const generateRandomAddress = (prefix: string) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 34; // Typical length for a cryptocurrency address
  let result = prefix;
  for (let i = 0; i < length - prefix.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
