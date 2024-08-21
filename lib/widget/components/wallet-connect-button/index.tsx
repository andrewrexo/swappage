'use client';

import { ArrowTopRightIcon, Link1Icon } from '@radix-ui/react-icons';
import { Button, ButtonProps, Text } from '@radix-ui/themes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { AlertCircleIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { WalletConnectSolana } from './solana';

const ChildButton = ({
  children,
  onClick,
  accountOnly = false,
  ...props
}: {
  children: ReactNode;
  onClick?: () => void;
  accountOnly?: boolean;
} & ButtonProps) => {
  return (
    <Button
      variant={accountOnly ? 'surface' : 'surface'}
      asChild
      className="flex cursor-pointer"
      onClick={onClick}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        {...(!accountOnly ? { whileHover: { scale: 1.02 } } : {})}
      >
        {children}
      </motion.div>
    </Button>
  );
};

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
  if (accountOnly) {
    switch (walletChain) {
      case 'solana':
        return <ButtonSolana accountOnly={accountOnly} size={size} />;
      case 'ethereum':
        return <ButtonEthereum accountOnly={accountOnly} size={size} />;
    }
  }

  if (fromNetwork === 'solana') {
    return <ButtonSolana accountOnly={accountOnly} size={size} />;
  }

  return <ButtonEthereum accountOnly={accountOnly} size={size} />;
}

const ButtonSolana = ({
  accountOnly,
  size = '4',
}: {
  accountOnly: boolean;
  size: ButtonProps['size'];
}) => {
  return (
    <WalletConnectSolana accountOnly={accountOnly}>
      <ChildButton
        size={accountOnly ? '2' : size}
        accountOnly={accountOnly}
        style={{ width: '100%' }}
      >
        Connect
        <Link1Icon
          className={`ml-auto ${accountOnly ? 'h-4 w-4' : 'h-6 w-6'}`}
        />
      </ChildButton>
    </WalletConnectSolana>
  );
};

const ButtonEthereum = ({
  accountOnly,
  size = '4',
}: {
  accountOnly: boolean;
  size: ButtonProps['size'];
}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;

        const iconSize = parseInt(size.toString()) <= 2 ? 4 : 6;
        const chainIconSize = {
          w: parseInt(size.toString()) <= 2 ? 16 : 24,
          h: parseInt(size.toString()) <= 2 ? 16 : 24,
        };

        return (
          <div
            className="w-full cursor-pointer"
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <ChildButton
                    onClick={openConnectModal}
                    size={accountOnly ? '2' : size}
                    accountOnly={accountOnly}
                  >
                    Connect
                    <Link1Icon
                      className={`ml-auto h-${iconSize} w-${iconSize}`}
                    />
                  </ChildButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <ChildButton
                    onClick={openChainModal}
                    size={size}
                    accountOnly={accountOnly}
                  >
                    Wrong network
                    <AlertCircleIcon
                      className={`ml-auto h-${iconSize} w-${iconSize}`}
                    />
                  </ChildButton>
                );
              }

              return (
                <ChildButton
                  onClick={openAccountModal}
                  size={size}
                  className="flex w-full justify-between"
                  accountOnly={accountOnly}
                >
                  <Text as="div" className="flex">
                    {chain.hasIcon && (
                      <div
                        style={{
                          width: chainIconSize.w,
                          height: chainIconSize.h,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{
                              width: chainIconSize.w,
                              height: chainIconSize.h,
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Text>
                  <Text className="truncate text-ellipsis sm:max-w-full">
                    {accountOnly ? '' : 'Pay with'} {account.displayName}
                  </Text>
                  <div className="ml-auto">
                    {!accountOnly && (
                      <ArrowTopRightIcon
                        className={`h-${iconSize} w-${iconSize}`}
                      />
                    )}
                  </div>
                </ChildButton>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
