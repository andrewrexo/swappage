import { Flex, Text } from '@radix-ui/themes';
import { SolanaLogo } from './solana-logo';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

const getDisplayLabelAddress = (address: string, length: number = 4) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export function WalletPreview({
  isPayment,
  address,
}: {
  isPayment: boolean;
  address: string;
}) {
  const isSmall = !isPayment;

  if (isSmall) {
    return (
      <Flex align="center" gap="2" justify="between" width="100%">
        <SolanaLogo small={isSmall} />
        {getDisplayLabelAddress(address, 4)}
      </Flex>
    );
  }

  return (
    <Flex gap="1" align="center" justify="between" width="100%">
      <SolanaLogo small={isSmall} />
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
