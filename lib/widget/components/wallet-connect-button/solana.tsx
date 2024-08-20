import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Badge, Card, Text, Flex } from '@radix-ui/themes';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  cloneElement,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { setSolanaAddress } from '../../features/swap/slice';
import { useAppDispatch } from '../../lib/hooks';
import { SolanaLogo } from './solana-logo';
import { ResponsiveDialogDrawer } from '../ui/dialog-drawer';

const MotionCard = motion(Card);

export function WalletConnectSolana({
  children,
  accountOnly = true,
}: {
  children: ReactNode;
  accountOnly?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect, autoConnect } = useWallet();

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
  }, [publicKey, connection]);

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

  return (
    <div className="text-white">
      <ResponsiveDialogDrawer
        triggerBlocked={!!publicKey}
        trigger={
          !publicKey
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
                  style: {
                    display: 'flex',
                    width: '100%',
                  },
                },
                <>
                  <Text
                    as="div"
                    className="flex cursor-pointer items-center justify-between gap-3"
                  >
                    <SolanaLogo small={accountOnly} />
                    {accountOnly ? '' : 'Pay with'}{' '}
                    {publicKey?.toBase58().slice(0, 4)}...
                    {publicKey?.toBase58().slice(-4)}
                  </Text>
                  <div className="ml-auto">
                    {!accountOnly && (
                      <ArrowTopRightIcon className={`ml-auto h-6 w-6`} />
                    )}
                  </div>
                </>,
              )
        }
        title="Connect"
        description="Select your Solana wallet to continue."
        setOpen={setOpen}
        open={open}
      >
        <Flex direction="column" gap="4" height="100%" justify="between">
          {wallets.map((wallet) => (
            <MotionCard
              key={wallet.adapter.name}
              whileHover={{
                scale: 1.025,
                backgroundColor: 'var(--gray-2)',
              }}
              className="flex w-full cursor-pointer p-4 hover:bg-[var(--gray-1)]"
              onClick={() => handleWalletSelect(wallet.adapter.name)}
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
            </MotionCard>
          ))}
          <Text size="1" color="gray">
            Not seeing your wallet? Let us know. We&apos;ll add it to the list.
          </Text>
        </Flex>
      </ResponsiveDialogDrawer>
    </div>
  );
}
