'use client';
import { Flex, Separator } from '@radix-ui/themes';
import { useEffect } from 'react';
import { AssetPicker } from '../../components/asset-picker/picker';
import { ParameterList } from '../../components/parameter-list';
import { SwapButton } from '../../components/swap-button';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchPairRate } from '../rates/slice';

export default function SwapWidgetHome() {
  const dispatch = useAppDispatch();
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

  return (
    <div className="space-y-4">
      <Flex direction="column" align="center" gap="6">
        <AssetPicker side="from" />
        <AssetPicker side="to" />
      </Flex>
      {currentRate && (
        <ParameterList
          {...swapBaseParameters}
          rate={currentRate}
          status={status}
        />
      )}
      <Separator size="4" className="my-0" />
      <SwapButton connected={true} fullWidth />
    </div>
  );
}
