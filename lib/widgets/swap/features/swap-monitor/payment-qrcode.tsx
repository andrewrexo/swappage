import { Button, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { CheckCheckIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function PaymentQRCode({ address }: { address: string }) {
  return (
    <>
      <motion.div
        exit={{ opacity: 0, height: '0px' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="flex items-center justify-center rounded-lg bg-[var(--gray-1)] pb-4"
      >
        <QRCodeSVG size={196} value={address} />
      </motion.div>
      <Button
        variant="surface"
        size="4"
        asChild
        className="mt-2 cursor-pointer"
      >
        <motion.div whileHover={{ scale: 1.02 }}>
          <Text>Mark as paid</Text>
          <CheckCheckIcon className="ml-auto" />
        </motion.div>
      </Button>
    </>
  );
}
