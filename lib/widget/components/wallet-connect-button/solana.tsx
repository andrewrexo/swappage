import { Badge, Card, Text, Flex, Box, Link } from '@radix-ui/themes';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  cloneElement,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { setSolanaAddress } from '../../features/swap/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { ResponsiveDialogDrawer } from '../ui/dialog-drawer';
import { WalletPreview } from './wallet-preview';
import toast from 'react-hot-toast';
import { toastConfig } from '@/lib/util';
import networks from '../../features/assets/network';
import { twMerge } from 'tailwind-merge';
import { TokenIcon } from '../ui/token-icon';

export function WalletConnectSolana({
  children,
  accountOnly = true,
}: {
  children: ReactNode;
  accountOnly?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { connection } = useConnection();
  const { solanaAddress } = useAppSelector((state) => state.swap);
  const { select, wallets, publicKey, disconnect } = useWallet();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    if (solanaAddress == publicKey?.toBase58()) {
      return;
    }

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        dispatch(setSolanaAddress(publicKey?.toBase58()!));
        // set balance in redux state
      }
    });
  }, [connection, publicKey]);

  const handleWalletSelect = async (walletName: any) => {
    if (walletName) {
      try {
        select(walletName);
        setOpen(false);
      } catch (error) {
        console.log('wallet connection err : ', error);
      }
    }
  };

  const handleDisconnect = async () => {
    disconnect();
    toast.success('Solana wallet disconnected', {
      icon: networks.solana.icon(16),
      ...toastConfig,
    });
  };

  const WalletButton = !publicKey ? (
    children
  ) : (
    <Flex>
      {cloneElement(
        children as ReactElement,
        {
          onClick: accountOnly
            ? handleDisconnect
            : () => {
                alert('yo');
              },
          className: 'cursor-pointer',
        },
        <WalletPreview
          connected={!!publicKey}
          network="solana"
          isPayment={!accountOnly}
          address={publicKey.toBase58()}
        />,
      )}
    </Flex>
  );

  return (
    <ResponsiveDialogDrawer
      triggerBlocked={!!publicKey}
      trigger={WalletButton}
      title={
        <>
          <Text
            size="7"
            weight="bold"
            className="text-[var(--accent-12) inline-flex items-center pb-2 pt-2 text-4xl sm:pb-0 sm:text-3xl"
          >
            <TokenIcon identifier="SOL" size={32} className="mr-4" />
            Connect
          </Text>
        </>
      }
      setOpen={setOpen}
      open={open}
    >
      <Flex direction="column" className="h-full p-0" gap="2">
        {wallets.map((wallet: any) => (
          <Flex
            key={wallet.adapter.name}
            justify="between"
            width="100%"
            className={twMerge(
              'flex w-full cursor-pointer rounded-lg',
              'bg-gradient-to-r from-[var(--gray-2)] to-[var(--gray-4)]',
              'px-6 py-6',
            )}
            onClick={() => handleWalletSelect(wallet.adapter.name)}
          >
            <Flex gap="2" justify="between" align="center" flexGrow="1">
              <Flex align="center" gap="2">
                <img
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  height={32}
                  width={32}
                  className="mr-4 rounded-lg"
                />
                <Text weight="bold" className="text-2xl">
                  {wallet.adapter.name}
                </Text>
              </Flex>

              {wallet.adapter.readyState === 'Installed' && (
                <Badge size="3" variant="surface" color="mint">
                  Detected
                </Badge>
              )}
            </Flex>
          </Flex>
        ))}
        <Text size="1" color="gray">
          Not seeing your wallet? Let us know. We&apos;ll add it to the list.
        </Text>
      </Flex>
    </ResponsiveDialogDrawer>
  );
}
