import { Badge, Card, Text, Flex, Box } from '@radix-ui/themes';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  cloneElement,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { setSolanaAddress } from '../../features/swap/slice';
import { useAppDispatch } from '../../lib/hooks';
import { ResponsiveDialogDrawer } from '../ui/dialog-drawer';
import { WalletPreview } from './wallet-preview';

export function WalletConnectSolana({
  children,
  accountOnly = true,
}: {
  children: ReactNode;
  accountOnly?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect } = useWallet();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.getAccountInfo(publicKey).then((info) => {
      console.log('info', info);
      if (info) {
        dispatch(setSolanaAddress(publicKey?.toBase58()!));
        // set balance in redux state
      }
    });
  }, [publicKey]);

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
  };

  const WalletButton = !publicKey
    ? children
    : cloneElement(
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
      );

  return (
    <ResponsiveDialogDrawer
      triggerBlocked={!!publicKey}
      trigger={WalletButton}
      title="Connect"
      setOpen={setOpen}
      open={open}
    >
      <Box className="space-y-4 p-2">
        {wallets.map((wallet: any) => (
          <Card
            key={wallet.adapter.name}
            className="flex w-full cursor-pointer p-4 transition-all hover:scale-[1.02] hover:bg-[var(--color-surface)] hover:bg-opacity-10 hover:shadow-[0_0_4px_0_rgba(0,0,0,0.45)]"
            onClick={() => handleWalletSelect(wallet.adapter.name)}
            size="3"
          >
            <Flex gap="2">
              <img
                src={wallet.adapter.icon}
                alt={wallet.adapter.name}
                height={32}
                width={32}
                className="mr-5 rounded-lg"
              />
              <Badge key={wallet.adapter.name} variant="soft" size="3">
                <div className="font-slackey">{wallet.adapter.name}</div>
              </Badge>
            </Flex>
          </Card>
        ))}
        <Text
          size="1"
          color="gray"
          as="div"
          style={{ whiteSpace: 'pre-wrap', marginBottom: 'auto' }}
        >
          Not seeing your wallet? Let us know. We&apos;ll add it to the list.
        </Text>
      </Box>
    </ResponsiveDialogDrawer>
  );
}
