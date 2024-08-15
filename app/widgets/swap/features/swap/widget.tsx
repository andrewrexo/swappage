'use client';
import { Flex, Separator, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import { AssetPicker } from '../../components/asset-picker/picker';
import { ParameterList } from '../../components/parameter-list';
import { SwapButton } from '../../components/swap-button';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchPairRate } from '../rates/slice';

export default function SwapWidgetHome() {
  const dispatch = useAppDispatch();
  const { currentRate } = useAppSelector((state) => state.rates);
  const { rate, pair } = useAppSelector((state) => state.swap);

  const swapBaseParameters = {
    rate,
    pair,
    provider: 'XOSwap', // TODO: get from rate
  };

  const MotionFlex = motion(Flex);

  useEffect(() => {
    if (pair) {
      dispatch(fetchPairRate(pair));
    }

    const intervalId = setInterval(() => {
      dispatch(fetchPairRate(pair));
    }, 100000); // 15 seconds

    // Clean up the interval when the component unmounts or when pair changes
    return () => clearInterval(intervalId);
  }, [dispatch, pair]);

  return (
    <div className="space-y-4">
      <Flex direction="column" align="center" gap="4">
        <AssetPicker side="from" />
        <AssetPicker side="to" />
      </Flex>
      {currentRate && (
        <ParameterList {...swapBaseParameters} rate={currentRate} />
      )}
      <Flex justify="end" direction="column" className="py-1">
        <Separator size="4" className="my-0" />
      </Flex>
      <Flex
        justify="end"
        direction="column"
        className="gap-3 text-center transition-all duration-200"
      >
        <SwapButton connected={true} />
        {currentRate && (
          <motion.div
            key={currentRate.expiry}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <Text size="2" color="gray">
              Rate valid until&nbsp;
              {new Date(currentRate.expiry).toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </Text>
            <span
              className={twMerge(
                'ml-1 inline-block h-1 w-1 rounded-full',
                currentRate.expiry > new Date().getTime()
                  ? 'bg-green-400'
                  : 'bg-red-400',
              )}
            ></span>
          </motion.div>
        )}
      </Flex>
    </div>
  );
}
