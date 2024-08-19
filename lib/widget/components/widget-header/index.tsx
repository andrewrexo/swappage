import { Flex, IconButton } from '@radix-ui/themes';
import { MenuIcon } from 'lucide-react';
import { WalletConnectButton } from '../wallet-connect-button';

export function WidgetHeader() {
  return (
    <Flex justify="between" align="center" gap="2">
      <WalletConnectButton size="2" accountOnly />
      <IconButton variant="ghost" size="1" className="cursor-pointer">
        <MenuIcon />
      </IconButton>
    </Flex>
  );
}
