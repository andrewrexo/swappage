'use client';

import {
  ArrowTopRightIcon,
  EyeOpenIcon,
  Link1Icon,
} from '@radix-ui/react-icons';
import { Button, ButtonProps, Text } from '@radix-ui/themes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { AlertCircleIcon } from 'lucide-react';
import type { ReactNode } from 'react';

const ChildButton = ({
  children,
  onClick,
  accountOnly = false,
  ...props
}: {
  children: ReactNode;
  onClick: () => void;
  accountOnly?: boolean;
} & ButtonProps) => {
  return (
    <Button
      variant={accountOnly ? 'surface' : 'surface'}
      asChild
      className="cursor-pointer"
      onClick={onClick}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full"
        whileHover={{ scale: 1.02 }}
      >
        {children}
      </motion.div>
    </Button>
  );
};

export function WalletConnectButton({
  accountOnly = false,
  size = '4',
  ...props
}: {
  accountOnly?: boolean;
  size?: ButtonProps['size'];
} & ButtonProps) {
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
                    Connect Wallet
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
                  className="flex justify-between"
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
                  {accountOnly ? '' : 'Pay with'} {account.displayName}
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
}
