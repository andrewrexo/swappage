import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import {
  Badge,
  Card,
  Dialog,
  Text,
  Flex,
  VisuallyHidden,
} from '@radix-ui/themes';
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
  const { select, wallets, publicKey, disconnect } = useWallet();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        // set balance in redux state
      }
    });
  }, [publicKey, connection]);

  useEffect(() => {
    dispatch(setSolanaAddress(publicKey?.toBase58()!));
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

  return (
    <div className="text-white">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        {!publicKey ? (
          <>
            <Dialog.Trigger>{children}</Dialog.Trigger>
          </>
        ) : (
          cloneElement(
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
                className="justify-betwee flex cursor-pointer items-center gap-3"
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
        )}

        <Dialog.Content
          style={{
            borderRadius: '10px',
            border: '1px solid var(--accent-5)',
            boxShadow: '1px 2px 1px var(--accent-3)',
            color: 'var(--gray-14)',
            background: 'var(--gray-1)',
          }}
        >
          <Dialog.Title className="pb-2 text-accent">
            Connect your wallet
          </Dialog.Title>
          <VisuallyHidden>
            <Dialog.Description>
              Search all available assets...
            </Dialog.Description>
          </VisuallyHidden>
          <Flex direction="column" gap="2" align="start">
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
                  <Badge
                    key={wallet.adapter.name}
                    //onClick={() => select(wallet.adapter.name)}
                    variant="soft"
                    size="3"
                  >
                    <div className="font-slackey">{wallet.adapter.name}</div>
                  </Badge>
                </Flex>
              </MotionCard>
            ))}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
