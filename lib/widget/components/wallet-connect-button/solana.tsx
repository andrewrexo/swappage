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
      console.log('info', info);
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
      icon: '🔌',
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
      title="Connect"
      setOpen={setOpen}
      open={open}
    >
      <Flex direction="column" className="h-full space-y-4 p-0">
        {wallets.map((wallet: any) => (
          <Card
            key={wallet.adapter.name}
            className="flex w-full cursor-pointer p-2 transition-all hover:scale-95 hover:bg-[var(--color-surface)] hover:bg-opacity-10 hover:shadow-[0_0_4px_0_rgba(0,0,0,0.45)]"
            onClick={() => handleWalletSelect(wallet.adapter.name)}
            size="3"
          >
            <Flex gap="2" justify="between" align="center">
              <Flex align="center" gap="2">
                <img
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  height={32}
                  width={32}
                  className="mr-4 rounded-lg"
                />
                <Link key={wallet.adapter.name} size="3" weight="medium">
                  <div className="text-2xl">{wallet.adapter.name}</div>
                </Link>
              </Flex>

              {wallet.adapter.readyState === 'Installed' && (
                <Badge size="3" variant="surface" color="mint">
                  Installed
                </Badge>
              )}
            </Flex>
          </Card>
        ))}
        <Text size="1" color="gray">
          Not seeing your wallet? Let us know. We&apos;ll add it to the list.
        </Text>
      </Flex>
    </ResponsiveDialogDrawer>
  );
}
