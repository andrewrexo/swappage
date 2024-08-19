'use client';
import {
  Badge,
  Box,
  Code,
  Flex,
  IconButton,
  Link,
  Text,
  Tooltip,
} from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { LazyOrder } from '../../lib/order';
import { CopyIcon, DoubleArrowLeftIcon } from '@radix-ui/react-icons';
import { PaymentOptions } from './payment-options';
import { MotionFlex } from '../../components/ui/radix-motion';

const MotionIconButton = motion(IconButton);

export function SwapMonitorWidget({ order }: { order: LazyOrder }) {
  const [paymentMethod, setPaymentMethod] = useState<'connect' | 'qr' | 'none'>(
    'none',
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(order.payinAddress || '');
  };

  const onChoosePayment = (method: 'connect' | 'qr' | 'none') => {
    setPaymentMethod(method);
  };

  return (
    <MotionFlex
      gap="4"
      direction="column"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[300px]"
    >
      <Text as="div" style={{ maxWidth: '100%' }} size="1" mt="-2">
        Pay{' '}
        <Link underline="always" style={{ maxWidth: '100%' }} size="1">
          {order.fromAmount} {order.from}
        </Link>{' '}
        for{' '}
        <Link underline="always" style={{ maxWidth: '100%' }} size="1">
          {order.toAmount} {order.to}
        </Link>
      </Text>
      <Flex gap="4" justify="between" className="w-full">
        <Box className="max-w-[60%]">
          <Text as="div" weight="bold" mb="1">
            Order number
          </Text>
          <Link
            tabIndex={2}
            underline="hover"
            highContrast
            size="2"
            href={`/order/${order.orderId}`}
            onClick={(e) => e.preventDefault()}
            style={{ maxWidth: '40%' }}
          >
            {order.orderId}
          </Link>
        </Box>
        <Box>
          <Text as="div" weight="bold" mb="1">
            Created
          </Text>
          <Text as="div" size="3">
            {new Date(order.created!).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </Box>
      </Flex>
      <Flex direction="column">
        <Flex direction="column" gap="2">
          <Flex align="center" justify="between" gap="2">
            <Flex align="center" gap="2">
              <Text as="div" weight="bold" size="3" align="left">
                Payment
              </Text>
              <Tooltip content="Copy payment address">
                <MotionIconButton
                  variant="soft"
                  size="1"
                  color="gray"
                  className="hover:text-primary transition-all hover:scale-110"
                  onClick={handleCopy}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <CopyIcon />
                </MotionIconButton>
              </Tooltip>
            </Flex>
            <Badge color="gold">Waiting for deposit</Badge>
          </Flex>
          <Flex gap="4" align="center">
            <Text as="div" size="2" className="flex flex-col break-all">
              <Box>
                {order.fromAmount}{' '}
                <Code variant="soft" size="2" className="w-fit">
                  {order.from}
                </Code>{' '}
                to{' '}
              </Box>
              <Link size="2" className="w-fit break-all">
                {order.payinAddress}
              </Link>
            </Text>
          </Flex>
          <Text size="1" color="gray" align="left" mt="-1" mb="2">
            Last update: {new Date(order.updated!).toLocaleTimeString()}
          </Text>
          <Flex align="center" key="header">
            <Flex justify="between" align="center" gap="2" className="mb-2">
              {paymentMethod === 'qr' && (
                <MotionIconButton
                  variant="soft"
                  size="1"
                  color="gray"
                  className="hover:text-primary transition-all hover:scale-110"
                  onClick={() => setPaymentMethod('none')}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <DoubleArrowLeftIcon />
                </MotionIconButton>
              )}
              <Text as="div" weight="bold" size="3" align="left">
                {paymentMethod === 'qr'
                  ? 'Scan QR code'
                  : paymentMethod === 'connect'
                    ? 'Connect wallet'
                    : 'Payment options'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <PaymentOptions
          address={order.payinAddress || ''}
          method={paymentMethod}
          onChoosePayment={onChoosePayment}
        />
      </Flex>
      <Text as="div" size="1" color="gray" className="mt-auto">
        Deposits must be made within 5 minutes of order creation. Late deposits
        will be swapped with a newer rate. <Link href="#">Learn more</Link>
      </Text>
    </MotionFlex>
  );
}
