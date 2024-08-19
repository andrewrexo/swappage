import { Button, Flex, IconButton, Text, Popover } from '@radix-ui/themes';
import { MenuIcon, ReplaceIcon, XIcon } from 'lucide-react';
import { WalletConnectButton } from '../wallet-connect-button';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { setActiveNetwork } from '../../features/swap/slice';

export function WidgetHeader() {
  const dispatch = useAppDispatch();
  const { fromAsset, toAsset, activeNetwork } = useAppSelector(
    (state) => state.swap,
  );

  const handleMenuClick = () => {
    console.log('menu clicked');
  };

  const handleNetworkChange = (network: 'solana' | 'ethereum') => {
    dispatch(setActiveNetwork(network));
  };

  return (
    <Flex justify="between" align="center" gap="2">
      <WalletConnectButton
        size="2"
        walletChain={
          activeNetwork
            ? activeNetwork
            : (fromAsset.network as 'ethereum' | 'solana')
        }
        accountOnly
      />
      <Popover.Root>
        <Popover.Trigger>
          <IconButton
            variant="ghost"
            size="1"
            className="cursor-pointer"
            onClick={handleMenuClick}
          >
            <MenuIcon className="h-4 w-4" />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content className="flex flex-col gap-2">
          <Text weight="medium">Wallet actions</Text>
          <Flex gap="2" direction="column">
            <Button
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
