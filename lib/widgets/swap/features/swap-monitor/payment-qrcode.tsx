import { Button, Flex, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { CheckCheckIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { MotionFlex } from '../../components/ui/radix-motion';

export function PaymentQRCode({ address }: { address: string }) {
  return (
    <MotionFlex
      direction="column"
      gap="4"
      key="qr"
      initial={{ opacity: 0, y: 25, height: 0 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{
        opacity: 0,
        height: 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Flex justify="center" align="center" direction="column" p="2" pt="4">
        <QRCodeSVG size={196} value="https://www.google.com" />
      </Flex>
      <Button variant="surface" size="4" asChild className="cursor-pointer">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Text>Mark as paid</Text>
          <CheckCheckIcon className="ml-auto" />
        </motion.div>
      </Button>
    </MotionFlex>
  );
}
