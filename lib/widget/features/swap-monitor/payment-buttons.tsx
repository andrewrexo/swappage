import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Separator, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { DynamicWalletConnectButton } from '../../components/widget-header';

export function PaymentButtons({
  handleShowQR,
  network,
}: {
  handleShowQR: () => void;
  network: 'solana' | 'ethereum';
}) {
  return (
    <>
      <DynamicWalletConnectButton
        walletChain={network}
        fromNetwork={network}
        accountOnly={false}
      />
      <Flex gap="2" align="center" justify="center">
        <Separator orientation="horizontal" size="4" />
        <Text as="div" size="1" color="gray" align="center">
          or
        </Text>
        <Separator orientation="horizontal" size="4" />
      </Flex>
      <Button
        variant="surface"
        size="4"
        onClick={handleShowQR}
        asChild
        className="cursor-pointer"
        aria-label="manual-payment-button"
      >
        <motion.div whileHover={{ scale: 1.02 }}>
          Manual payment
          <ArrowTopRightIcon className="ml-auto h-6 w-6" />
        </motion.div>
      </Button>
    </>
  );
}
