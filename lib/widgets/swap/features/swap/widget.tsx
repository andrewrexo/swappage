'use client';
import { Flex, Separator } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { AssetControl } from '../../components/asset-control';
import { ParameterList } from '../../components/parameter-list';
import { SwapButton } from '../../components/swap-button';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchPairRate } from '../rates/slice';
import { useRouter } from 'next/navigation';
import { fetchAssets } from '../assets/slice';
import { LazyOrder } from '../../lib/order';
import toast from 'react-hot-toast';
import { createOrderInternal } from './api';

export default function SwapWidgetHome() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { fromAmount, toAmount, slippage, fromAsset, toAsset } = useAppSelector(
    (state) => state.swap,
  );
  const { currentRate: rate, status } = useAppSelector((state) => state.rates);
  const { pair } = useAppSelector((state) => state.swap);
  const { assets } = useAppSelector((state) => state.assets);
  const [swapComplete, setSwapComplete] = useState(false);

  const swapBaseParameters = {
    pair,
    provider: 'XOSwap', // TODO: get from rate
  };

  useEffect(() => {
    if (!assets || assets.length === 0) {
      dispatch(
        fetchAssets(['solana', 'arbitrumone', 'basemainnet', 'ethereum']),
      );
    }
  }, [dispatch, pair]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchPairRate(pair));
    }, 15000); // 15 seconds

    // Clean up the interval when the component unmounts or when pair changes
    return () => clearInterval(intervalId);
  }, [dispatch, pair]);

  const onComplete = ({ orderId }: { orderId: string }) => {
    router.push(`/swap/${orderId}`);
  };

  const onExecute = () => {
    const createSwap = async () => {
      const solAddress = 'FinVobfi4tbdMdfN9jhzUuDVqGXfcFnRGX57xHcTWLfW';
      const ethAddress = '0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97';

      const from = pair.split('_')[0];
      const to = pair.split('_')[1];

      const fromAddress =
        fromAsset.network === 'solana' ? solAddress : ethAddress;
      const toAddress = toAsset.network === 'solana' ? solAddress : ethAddress;
      // Create order object with necessary data
      const orderData: LazyOrder = {
        from,
        to,
        fromAmount: parseFloat(fromAmount),
        toAmount: parseFloat(toAmount),
        fromAddress,
        toAddress,
        rate: rate?.amount.value,
        expiry: rate?.expiry,
        provider: 'XOSwap',
        slippage,
        pair,
      };

      const swap = await createOrderInternal({
        ...orderData,
      });

      if (!swap || !swap.success) {
        console.error('Failed to create swap', swap);
      }

      if (swap.success) {
        toast.success('Swap created successfully.', {
          duration: 2500,
          position: 'bottom-right',
          style: {
            borderRadius: '10px',
            border: '1px solid var(--accent-5)',
            boxShadow: '2px 4px 20px var(--accent-3)',
            color: 'var(--gray-14)',
            background: 'var(--gray-1)',
          },
        });

        setSwapComplete(true);
        onComplete({ orderId: swap.order.order_id });
      }
    };

    toast.loading('Creating swap...', {
      duration: 2500,
      position: 'bottom-right',
      style: {
        borderRadius: '10px',
        border: '1px solid var(--accent-5)',
        boxShadow: '2px 4px 20px var(--accent-3)',
        color: 'var(--gray-14)',
        background: 'var(--gray-1)',
      },
    });

    createSwap();
  };

  return (
    <Flex direction="column" gap="4">
      <Flex direction="column" align="center" gap="6">
        <AssetControl side="from" />
        <AssetControl side="to" />
      </Flex>
      <Separator size="4" />
      {rate && (
        <ParameterList {...swapBaseParameters} rate={rate} status={status} />
      )}
      <SwapButton
        connected={true}
        onExecute={onExecute}
        isComplete={swapComplete}
        fullWidth
      />
    </Flex>
  );
}
