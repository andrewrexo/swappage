'use client';
import { Flex, Separator } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { AssetControl } from '../../components/asset-control';
import { ParameterList } from '../../components/parameter-list';
import { SwapButton } from '../../components/swap-button';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { useRouter } from 'next/navigation';
import { fetchAssets } from '../assets/slice';
import { LazyOrder } from '../../lib/order';
import toast from 'react-hot-toast';
import { createOrderInternal } from './api';
import { motion } from 'framer-motion';
import { SwapInput } from './input';
import { toastConfig } from '@/lib/util';

const MotionFlex = motion(Flex);

export default function SwapWidgetHome() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    solanaAddress,
    ethereumAddress,
    fromAmount,
    toAmount,
    slippage,
    fromAsset,
    toAsset,
  } = useAppSelector((state) => state.swap);

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

  const onComplete = ({ orderId }: { orderId: string }) => {
    router.push(`/swap/${orderId}`);
  };

  const onExecute = () => {
    const createSwap = async () => {
      const solAddress =
        solanaAddress || 'FinVobfi4tbdMdfN9jhzUuDVqGXfcFnRGX57xHcTWLfW';
      const ethAddress =
        ethereumAddress || '0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97';

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
        fromNetwork: fromAsset.network,
        toNetwork: toAsset.network,
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
        toast.success('Swap created successfully.', { ...toastConfig });

        setSwapComplete(true);
        onComplete({ orderId: swap.order.order_id });
      }
    };

    toast.loading('Creating swap...', { ...toastConfig });

    createSwap();
  };

  return (
    <MotionFlex
      direction="column"
      gap="4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SwapInput />
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
    </MotionFlex>
  );
}
