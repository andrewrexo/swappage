import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Separator, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { WalletConnectButton } from '../../components/wallet-connect-button';
import { useAppSelector } from '../../lib/hooks';

export function PaymentButtons({ handleShowQR }: { handleShowQR: () => void }) {
  const { activeNetwork, fromNetwork } = useAppSelector((state) => state.swap);

  return (
    <>
      <WalletConnectButton
        walletChain={activeNetwork}
        fromNetwork={fromNetwork as 'solana' | 'ethereum'}
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
      >
        <motion.div whileHover={{ scale: 1.02 }}>
          Manual payment
          <ArrowTopRightIcon className="ml-auto h-6 w-6" />
        </motion.div>
      </Button>
    </>
  );
}
