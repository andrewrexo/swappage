'use client';
import { Flex, IconButton, Spinner, Text } from '@radix-ui/themes';
import { WidgetHeader } from './components/widget-header';
import { twMerge } from 'tailwind-merge';
import { useAppDispatch, useAppSelector } from './lib/hooks';
import { AnimatePresence } from 'framer-motion';
import { type ReactNode, useEffect } from 'react';
import { fetchPairRate, setCurrentRate } from './features/rates/slice';
import { useMediaQuery } from './lib/hooks';
import toast, { Toaster } from 'react-hot-toast';
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation';
import { MotionFlex } from './components/ui/radix-motion';
import { useAccount } from 'wagmi';
import { animVariants } from './config';
import { setEthereumAddress, setSolanaAddress } from './features/swap/slice';
import { toastConfig } from '../util';
import { useWallet } from '@solana/wallet-adapter-react';
import { TokenIcon } from './components/ui/token-icon';
import { PairRate } from './lib/exodus/rate';

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

export function SwapWidget({
  freshRate,
  children,
  ...swapWidgetProps
}: SwapWidgetProps & { children: ReactNode; freshRate?: PairRate }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { width, className } = swapWidgetProps;
  const { status, currentRate } = useAppSelector((state) => state.rates);
  const { pair } = useAppSelector((state) => state.swap);
  const isSmall = useMediaQuery('(max-width: 640px)');
  const account = useAccount();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (account.address) {
      dispatch(setEthereumAddress(account.address));

      toast.success(
        `Connected to wallet ${account.address.slice(0, 6)}...${account.address.slice(-4)}`,
        {
          ...toastConfig,
          icon: <TokenIcon identifier="ETH" size={24} />,
        },
      );
    }
  }, [account.address, dispatch]);

  useEffect(() => {
    if (publicKey) {
      const account = publicKey?.toBase58()!;
      dispatch(setSolanaAddress(account));

      toast.success(
        `Connected to wallet: ${account.slice(0, 6)}...${account.slice(-4)}`,
        { ...toastConfig, icon: <TokenIcon identifier="SOL" size={24} /> },
      );
    }
  }, [publicKey]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchPairRate(pair));
    }, 15000); // 15 seconds

    return () => clearInterval(intervalId);
  }, [dispatch, pair]);

  useEffect(() => {
    if (freshRate && !currentRate) {
      dispatch(setCurrentRate(freshRate));
    }

    dispatch(fetchPairRate(pair));
  }, [pair, freshRate, dispatch]);

  useEffect(() => {}, [dispatch, pair]);

  return (
    <AnimatePresence>
      <MotionFlex
        justify="center"
        className={twMerge(className, `h-full border-[1px] border-accent`)}
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
        variants={animVariants}
        animate="animate"
        exit="exit"
      >
        <Flex
          direction="column"
          className={twMerge('h-full w-full gap-4 rounded-xl', className)}
        >
          <Flex justify="between" gap="4">
            <Flex gap="2" align="center">
              {pathname !== '/swap' && !isSmall && (
                <IconButton
                  size="2"
                  onClick={() => router.push('/swap/')}
                  variant="soft"
                >
                  <DoubleArrowLeftIcon className="h-6 w-6" />
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
