'use client';
import { Box, Flex, Separator, Text } from '@radix-ui/themes';
import { AssetPicker } from './components/asset-picker/picker';
import { WidgetHeader } from './components/widget-header';
import { SwapButton } from './components/swap-button';
import { ParameterList } from './components/parameter-list';
import { twMerge } from 'tailwind-merge';
import { useAppDispatch, useAppSelector } from './lib/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { fetchPairRate } from './features/rates/slice';

type SwapMode = 'input' | 'output' | 'flexible';
type RatesMode = 'fixed' | 'float';
type AssetDiscovery = 'enabled' | 'disabled' | (string & {});

export interface SwapWidgetProps {
  // todo: add props
  width: string;
  height: string;
  theme: 'light' | 'dark';
  backgroundColor: string;
  textColor: string;
  assetMode: SwapMode;
  ratesMode: RatesMode;
  assetDiscovery: AssetDiscovery;
  className: string;
}

const swapWidgetVariants = {
  animate: {
    height: 'auto',
    opacity: 1,
    scale: 1,
    transition: {
      height: {
        duration: 0.5,
        ease: 'easeInOut',
      },
      opacity: {
        duration: 0.3,
        delay: 0.2,
      },
      scale: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    scale: 0.8,
    transition: {
      height: {
        duration: 0.5,
        ease: 'easeInOut',
      },
      opacity: {
        duration: 0.3,
      },
      scale: {
        duration: 0.3,
      },
    },
  },
};

export function SwapWidget({ ...swapWidgetProps }: SwapWidgetProps) {
  const dispatch = useAppDispatch();
  const { width, height, className } = swapWidgetProps;
  const { rate, fromAsset, toAsset, pair } = useAppSelector(
    (state) => state.swap,
  );

  const swapBaseParameters = {
    rate,
    pair,
    provider: 'XOSwap',
  };

  useEffect(() => {
    if (pair) {
      dispatch(fetchPairRate(pair));
    }
  }, [dispatch, pair]);

  return (
    <AnimatePresence>
      <Box
        width={{ initial: '100%', sm: width }}
        height={{ initial: '100%', sm: height }}
        className={twMerge(className, ``)}
      >
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
            scale: 0.8,
          }}
          variants={swapWidgetVariants}
          animate="animate"
          exit="exit"
        >
          <Flex
            direction="column"
            className={twMerge(
              'gap-4 rounded-xl border-[1px] border-accent p-4 shadow-sm outline-yellow-500',
              className,
            )}
          >
            <Flex justify="between">
              <Text
                size="5"
                weight="bold"
                className="user-select-none pointer-events-none text-accent"
              >
                Swappage
              </Text>
              <WidgetHeader />
            </Flex>
            <Flex direction="column" align="center" gap="3">
              <AssetPicker side="from" />
              <AssetPicker side="to" />
            </Flex>
            <ParameterList {...swapBaseParameters} />
            <Separator size="4" className="my-1" />
            <Flex
              justify="end"
              direction="column"
              className="transition-all duration-200"
            >
              <SwapButton connected={true} />
            </Flex>
          </Flex>
        </motion.div>
      </Box>
    </AnimatePresence>
  );
}
