'use client';
import { Box, Flex, Spinner, Text } from '@radix-ui/themes';
import { WidgetHeader } from './components/widget-header';
import { twMerge } from 'tailwind-merge';
import { useAppDispatch, useAppSelector } from './lib/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useEffect } from 'react';
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

export function SwapWidget({
  children,
  ...swapWidgetProps
}: SwapWidgetProps & { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { width, height, className } = swapWidgetProps;
  const { currentRate, status } = useAppSelector((state) => state.rates);
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

    const intervalId = setInterval(() => {
      dispatch(fetchPairRate(pair));
    }, 100000); // 15 seconds

    // Clean up the interval when the component unmounts or when pair changes
    return () => clearInterval(intervalId);
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
                className="user-select-none pointer-events-none flex items-center gap-2 text-accent"
              >
                Swappage {status === 'loading' ? <Spinner /> : ''}
              </Text>
              <WidgetHeader />
            </Flex>
            {children}
          </Flex>
        </motion.div>
      </Box>
    </AnimatePresence>
  );
}
