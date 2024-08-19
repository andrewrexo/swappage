'use client';
import { Flex, IconButton, Spinner, Text } from '@radix-ui/themes';
import { WidgetHeader } from './components/widget-header';
import { twMerge } from 'tailwind-merge';
import { useAppDispatch, useAppSelector } from './lib/hooks';
import { AnimatePresence } from 'framer-motion';
import { type ReactNode, useEffect } from 'react';
import { fetchPairRate } from './features/rates/slice';
import { useMediaQuery } from './lib/hooks';
import { Toaster } from 'react-hot-toast';
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation';
import { MotionFlex } from './components/ui/radix-motion';

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
        ease: 'anticipate',
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
  const router = useRouter();
  const pathname = usePathname();
  const { width, className } = swapWidgetProps;
  const { status, currentRate } = useAppSelector((state) => state.rates);
  const { pair } = useAppSelector((state) => state.swap);

  const isSmall = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchPairRate(pair));
    }, 15000); // 15 seconds

    return () => clearInterval(intervalId);
  }, [dispatch, pair]);

  useEffect(() => {
    dispatch(fetchPairRate(pair));
  }, [dispatch, pair]);

  return (
    <AnimatePresence>
      <MotionFlex
        justify="center"
        className={twMerge(
          className,
          `h-full border-[1px] border-accent transition-transform duration-300`,
        )}
        width={isSmall ? '100%' : width}
        initial={{
          height: '100%',
          opacity: 0,
          scale: 1,
        }}
        style={{
          border: '1px solid var(--accent-11)',
          borderRadius: '1rem',
          padding: '1rem',
        }}
        variants={swapWidgetVariants}
        animate="animate"
        exit="exit"
      >
        <Flex
          direction="column"
          className={twMerge('h-full w-full gap-4 rounded-xl', className)}
        >
          <Flex justify="between" gap="4">
            <Flex gap="2" align="center">
              {pathname !== '/swap' && (
                <IconButton
                  size="1"
                  onClick={() => router.push('/swap/')}
                  variant="soft"
                >
                  <DoubleArrowLeftIcon />
                </IconButton>
              )}
              <Text
                size="5"
                weight="bold"
                className="user-select-none pointer-events-none flex items-center gap-2 text-accent"
              >
                Swappage {status === 'loading' ? <Spinner /> : ''}
              </Text>
            </Flex>
            <WidgetHeader />
          </Flex>
          {children}
        </Flex>
      </MotionFlex>
      <Toaster key="toast" />
    </AnimatePresence>
  );
}
