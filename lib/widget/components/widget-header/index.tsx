import { Button, Flex, IconButton, Text, Popover } from '@radix-ui/themes';
import { MenuIcon, ReplaceIcon, XIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { setActiveNetwork } from '../../features/swap/slice';
import dynamic from 'next/dynamic';
import { DefaultButton } from '../wallet-connect-button/buttons/default';

export const DynamicWalletConnectButton = dynamic(
  () =>
    import('../wallet-connect-button').then((mod) => mod.WalletConnectButton),
  {
    loading: () => <DefaultButton>Loading</DefaultButton>,
    ssr: false,
  },
);

export function WidgetHeader() {
  const dispatch = useAppDispatch();
  const { fromNetwork, activeNetwork } = useAppSelector((state) => state.swap);

  const handleNetworkChange = (network: 'solana' | 'ethereum') => {
    dispatch(setActiveNetwork(network));
  };

  return (
    <Flex justify="between" align="center" gap="2">
      <DynamicWalletConnectButton
        size="2"
        walletChain={activeNetwork ?? fromNetwork}
        accountOnly
      />
      <Popover.Root>
        <Popover.Trigger>
          <IconButton
            variant="soft"
            size="2"
            className="cursor-pointer"
            aria-label="open-menu"
          >
            <MenuIcon />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content className="flex flex-col gap-2">
          <Text weight="medium">Wallet actions</Text>
          <Flex gap="2" direction="column">
            <Button
              aria-label="network-button"
              size="3"
              variant="soft"
              onClick={() => {
                handleNetworkChange(
                  activeNetwork === 'solana' ? 'ethereum' : 'solana',
                );
              }}
            >
              Switch to {activeNetwork === 'solana' ? 'EVM' : 'SOL'} Wallet
              <ReplaceIcon className="ml-auto h-4 w-4" />
            </Button>
            <Button
              aria-label="disconnect-button"
              size="3"
              variant="soft"
              onClick={() => {
                //handleDisconnect();
              }}
            >
              Disconnect wallet
              <XIcon className="ml-auto h-4 w-4" />
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
}
