import { Box, Flex, Text } from '@radix-ui/themes';
import { ArrowTopRightIcon, Link1Icon } from '@radix-ui/react-icons';
import type { SupportedNetwork } from '../../features/assets/network';
import networks from '../../features/assets/network';

const getDisplayLabelAddress = (address: string, length: number = 4) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export function WalletPreview({
  isPayment,
  address,
  network,
  connected,
}: {
  network: SupportedNetwork;
  isPayment: boolean;
  address: string;
  connected: boolean;
}) {
  const isSmall = !isPayment;

  if (!connected) {
    return (
      <Flex align="center" gap="2" justify="between" width="100%">
        {networks[network].icon(isSmall ? 16 : 24)}
        Connect
        <Link1Icon className={`ml-auto ${isSmall ? 'h-4 w-4' : 'h-6 w-6'}`} />
      </Flex>
    );
  }

  if (isSmall) {
    return (
      <Flex align="center" gap="2" justify="between" width="100%">
        {networks[network].icon(16)}
        {getDisplayLabelAddress(address, 4)}
      </Flex>
    );
  }

  return (
    <Flex gap="1" align="center" justify="between" width="100%">
      {networks[network].icon(24)}
      {isPayment && (
        <Text as="div" className="ml-2">
          Pay with
        </Text>
      )}
      {getDisplayLabelAddress(address, 4)}
      <div className="ml-auto">
        <ArrowTopRightIcon className={`ml-auto h-6 w-6`} />
      </div>
    </Flex>
  );
}
