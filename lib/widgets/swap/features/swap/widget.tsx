'use client';
import { Flex, Separator } from '@radix-ui/themes';
import { useEffect } from 'react';
import { AssetControl } from '../../components/asset-control';
import { ParameterList } from '../../components/parameter-list';
import { SwapButton } from '../../components/swap-button';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchPairRate } from '../rates/slice';
import { useRouter } from 'next/navigation';

export default function SwapWidgetHome() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { currentRate, status } = useAppSelector((state) => state.rates);
  const { rate, pair } = useAppSelector((state) => state.swap);

  const swapBaseParameters = {
    rate,
    pair,
    provider: 'XOSwap', // TODO: get from rate
  };

  useEffect(() => {
    if (pair) {
      dispatch(fetchPairRate(pair));
    }

    const intervalId = setInterval(() => {
      dispatch(fetchPairRate(pair));
    }, 15000); // 15 seconds

    // Clean up the interval when the component unmounts or when pair changes
    return () => clearInterval(intervalId);
  }, [dispatch, pair]);

  const onExecute = () => {
    if (currentRate) {
      router.push('/swap/monitor');
    }
  };

  return (
    <Flex direction="column" gap="4">
      <Flex direction="column" align="center" gap="6">
        <AssetControl side="from" />
        <AssetControl side="to" />
      </Flex>
      <Separator size="4" />
      {currentRate && (
        <ParameterList
          {...swapBaseParameters}
          rate={currentRate}
          status={status}
        />
      )}
      <SwapButton connected={true} onExecute={onExecute} fullWidth />
    </Flex>
  );
}
