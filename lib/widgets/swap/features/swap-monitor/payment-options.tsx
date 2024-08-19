import { MotionFlex } from '../../components/ui/motion-flex';
import { useState } from 'react';
import { PaymentOptionsSelect } from './payment-options-select';
import { PaymentQRCode } from './payment-qrcode';
import { AnimatePresence, motion } from 'framer-motion';
import { MotionFlexUnstyled } from '../../components/ui/radix-motion';
import { Flex } from '@radix-ui/themes';

export function PaymentOptions({
  address,
  method,
  onChoosePayment,
}: {
  address: string;
  method: 'connect' | 'qr' | 'none';
  onChoosePayment: (method: 'connect' | 'qr' | 'none') => void;
}) {
  const handleShowQR = () => {
    onChoosePayment('qr');
  };

  const handleShowConnect = () => {
    onChoosePayment('connect');
  };

  const renderPaymentMethod = () => {
    switch (method) {
      case 'qr':
        return (
          <MotionFlexUnstyled
            exit={{ opacity: 0, height: '0px', y: -40 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            direction="column"
            justify="center"
            key="qr"
          >
            <PaymentQRCode address={address} />
          </MotionFlexUnstyled>
        );
      case 'connect':
        return (
          <MotionFlex key="connect" py="4">
            <PaymentOptionsSelect handleShowQR={handleShowQR} />
          </MotionFlex>
        );
      case 'none':
        return (
          <motion.div
            exit={{ opacity: 0, height: '0px' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            key="none"
            className="flex flex-col justify-center gap-4"
          >
            <PaymentOptionsSelect handleShowQR={handleShowQR} />
          </motion.div>
        );
      default:
        return <Flex key="none">asd</Flex>;
    }
  };

  return (
    <AnimatePresence mode="popLayout">{renderPaymentMethod()}</AnimatePresence>
  );
}
