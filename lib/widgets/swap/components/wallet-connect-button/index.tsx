'use client';
import { Link1Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { motion } from 'framer-motion';

export function WalletConnectButton() {
  const { open, close } = useWeb3Modal();

  const onButtonClick = () => {
    open();
  };

  return (
    <Button
      variant="surface"
      size="4"
      asChild
      className="cursor-pointer"
      onClick={onButtonClick}
    >
      <motion.div whileHover={{ scale: 1.02 }}>
        Connect
        <Link1Icon className="ml-auto h-6 w-6" />
      </motion.div>
    </Button>
  );
}
