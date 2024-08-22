'use client';

import { ButtonProps } from '@radix-ui/themes';
import type { SupportedNetwork } from '../../features/assets/network';
import { ButtonEthereum } from './buttons/ethereum';
import { ButtonSolana } from './buttons/solana';

export function WalletConnectButton({
  accountOnly = false,
  size = '4',
  walletChain = 'solana',
  fromNetwork = 'solana',
  ...props
}: {
  accountOnly?: boolean;
  walletChain?: 'ethereum' | 'solana';
  fromNetwork?: 'ethereum' | 'solana';
  size?: ButtonProps['size'];
} & ButtonProps) {
  const getWalletButton = (chain: SupportedNetwork) => {
    switch (chain) {
      case 'solana':
        return <ButtonSolana accountOnly={accountOnly} size={size} />;
      case 'ethereum':
        return <ButtonEthereum accountOnly={accountOnly} size={size} />;
    }
  };

  if (accountOnly) {
    return getWalletButton(walletChain);
  } else {
    return getWalletButton(fromNetwork);
  }
}
