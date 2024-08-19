'use client';

import { ArrowTopRightIcon, Link1Icon } from '@radix-ui/react-icons';
import { Button, Text } from '@radix-ui/themes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { AlertCircleIcon } from 'lucide-react';
import type { ReactNode } from 'react';

const ChildButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="surface"
      size="4"
      asChild
      className="cursor-pointer"
      onClick={onClick}
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

export function WalletConnectButton() {
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

        console.log('ready', ready);
        console.log('connected', connected);

        return (
          <div
            className="w-full"
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
                  <ChildButton onClick={openConnectModal}>
                    Connect Wallet
                    <Link1Icon className="ml-auto h-6 w-6" />
                  </ChildButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <ChildButton onClick={openChainModal}>
                    Wrong network
                    <AlertCircleIcon className="ml-auto h-6 w-6" />
                  </ChildButton>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <ChildButton onClick={openAccountModal}>
                    <Text as="div" className="flex items-center gap-2">
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 24,
                            height: 24,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginTop: -2,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 24, height: 24 }}
                            />
                          )}
                        </div>
                      )}
                      Pay with {account.displayName}
                    </Text>
                    <div className="ml-auto">
                      <ArrowTopRightIcon className="h-6 w-6" />
                    </div>
                  </ChildButton>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
