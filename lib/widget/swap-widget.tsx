'use client';
import { Flex, Spinner, Text } from '@radix-ui/themes';
import { WidgetHeader } from './components/widget-header';
import { twMerge } from 'tailwind-merge';
import { useAppDispatch, useAppSelector } from './lib/hooks';
import { AnimatePresence } from 'framer-motion';
import { type ReactNode, useEffect } from 'react';
import { useMediaQuery } from './lib/hooks';
import toast, { Toaster } from 'react-hot-toast';
import { MotionFlex } from './components/ui/radix-motion';
import { useAccount } from 'wagmi';
import { animVariants } from './config';
import { setEthereumAddress, setSolanaAddress } from './features/swap/slice';
import { toastConfig } from '../util';
import { useWallet } from '@solana/wallet-adapter-react';
import { PairRate } from './lib/exodus/rate';
import { displayAddress } from './lib/display-utils';
import { AssetIcon } from './components/asset-icon';

type SwapMode = 'input' | 'output' | 'flexible';
type RatesMode = 'fixed' | 'float';
//todo pass in supported networks

export interface SwapWidgetProps {
  width: string;
  height: string;
  theme: 'light' | 'dark';
  backgroundColor: string;
  textColor: string;
  assetMode: SwapMode;
  ratesMode: RatesMode;
  className: string;
}

export function SwapWidget({
  freshRate,
  children,
  ...swapWidgetProps
}: SwapWidgetProps & { children: ReactNode; freshRate?: PairRate }) {
  const { width, className } = swapWidgetProps;

  const dispatch = useAppDispatch();
  const isSmall = useMediaQuery('(max-width: 640px)');

  const account = useAccount();
  const { publicKey } = useWallet();
  const { status } = useAppSelector((state) => state.rates);

  useEffect(() => {
    if (account.address) {
      dispatch(setEthereumAddress(account.address));

      toast.success(`Connected to wallet ${displayAddress(account.address)}`, {
        ...toastConfig,
        icon: <AssetIcon asset={{ symbol: 'ETH' }} />,
      });
    }
  }, [account.address, dispatch]);

  // detects pairing of Solana wallet and stores in redux
  useEffect(() => {
    if (publicKey) {
      const account = publicKey?.toBase58()!;
      dispatch(setSolanaAddress(account));

      toast.success(`Connected to wallet: ${displayAddress(account)}`, {
        ...toastConfig,
        icon: <AssetIcon asset={{ symbol: 'SOL' }} />,
      });
    }
  }, [publicKey, dispatch]);

  return (
    <AnimatePresence>
      <MotionFlex
        justify="center"
        className={twMerge(className, `h-full animate-gradient-x`)}
        width={isSmall ? '100%' : width}
        initial={{
          height: '100%',
          opacity: 0,
          scale: 1,
        }}
        style={{
          borderRadius: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--color-background)',
          boxShadow: '0 0 0 2px var(--accent-a9)',
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
              <Text size="5" weight="bold" className="text-accent">
                Swappage
              </Text>
              {status === 'loading' ? <Spinner /> : ''}
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
