import { toastConfig } from '@/lib/util';
import type { ButtonProps } from '@radix-ui/themes';
import { AlertCircleIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDisconnect } from 'wagmi';
import { WalletPreview } from '../wallet-preview';
import { DefaultButton } from './default';
import { TokenIcon } from '../../ui/token-icon';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const ButtonEthereum = ({
  accountOnly,
  size = '4',
}: {
  accountOnly: boolean;
  size: ButtonProps['size'];
}) => {
  const { disconnectAsync } = useDisconnect();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        const disconnect = () => {
          disconnectAsync().then(() => {
            toast.success('Ethereum wallet disconnected', {
              icon: <TokenIcon identifier="ETH" size={16} />,
              ...toastConfig,
            });
          });
        };
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;
        const iconSize = parseInt(size.toString()) <= 2 ? 4 : 6;

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
                  <DefaultButton
                    onClick={openConnectModal}
                    name="connect-ethereum-wallet"
                    size={accountOnly ? '2' : size}
                    accountOnly={accountOnly}
                    style={{ width: '100%' }}
                  >
                    <WalletPreview
                      network="ethereum"
                      isPayment={!accountOnly}
                      address={''}
                      connected={false}
                    />
                  </DefaultButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <DefaultButton
                    onClick={openChainModal}
                    name="wrong-network"
                    size={size}
                    accountOnly={accountOnly}
                  >
                    Wrong network
                    <AlertCircleIcon
                      className={`ml-auto h-${iconSize} w-${iconSize}`}
                    />
                  </DefaultButton>
                );
              }

              return (
                <DefaultButton
                  onClick={accountOnly ? disconnect : undefined}
                  size={size}
                  name="disconnect-ethereum-wallet"
                  className="flex w-full justify-between"
                  accountOnly={accountOnly}
                >
                  <WalletPreview
                    network="ethereum"
                    isPayment={!accountOnly}
                    address={account.address}
                    connected={account && ready}
                  />
                </DefaultButton>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
