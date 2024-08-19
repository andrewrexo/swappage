'use client';
import {
  Badge,
  Box,
  Button,
  Code,
  Flex,
  Grid,
  IconButton,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes';
import { AnimatePresence, motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import type { LazyOrder } from '../../lib/order';
import { CopyIcon, DoubleArrowLeftIcon } from '@radix-ui/react-icons';
import { CheckCheckIcon } from 'lucide-react';

const MotionFlex = motion(Flex);
const MotionIconButton = motion(IconButton);

export function SwapMonitorWidget({ order }: { order: LazyOrder }) {
  const [showQR, setShowQR] = useState(false);

  const handleShowQR = () => {
    setShowQR(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(order.payinAddress || '');
  };

  return (
    <MotionFlex
      gap="4"
      direction="column"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
      <Grid columns="1" className="min-h-[300px]">
        <Flex direction="column" gap="2">
          <Text as="div" weight="bold" size="3" align="left">
            Payment
          </Text>
          <Flex gap="4">
            <IconButton variant="soft" size="3" onClick={handleCopy}>
              <CopyIcon />
            </IconButton>
            <Text as="div" size="2" mb="2" style={{ maxWidth: '85%' }}>
              {order.fromAmount} <Code variant="soft">{order.from}</Code> to{' '}
              <Code variant="soft" style={{ width: '100px' }}>
                {order.payinAddress}
              </Code>
            </Text>
          </Flex>
          <Text size="1" color="gray" align="left" mt="-1" mb="2">
            Last update: {new Date(order.updated!).toLocaleTimeString()}
          </Text>
          <Flex align="center" key="header">
            <Flex justify="between" align="center" gap="2">
              {showQR && (
                <MotionIconButton
                  variant="soft"
                  size="1"
                  color="gray"
                  className="hover:text-primary transition-all hover:scale-110"
                  onClick={() => setShowQR(false)}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <DoubleArrowLeftIcon />
                </MotionIconButton>
              )}
              <Text as="div" weight="bold" size="3" align="left">
                {showQR ? 'Scan QR code' : 'Deposit'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <AnimatePresence mode="wait">
          {showQR ? (
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
              transition={{ duration: 0.75, ease: 'easeInOut' }}
            >
              <Flex
                justify="center"
                align="center"
                direction="column"
                p="2"
                pt="4"
              >
                <QRCodeSVG size={196} value="https://www.google.com" />
              </Flex>
              <Button variant="surface" size="4" asChild>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Text>Mark as paid</Text>
                  <CheckCheckIcon className="ml-auto" />
                </motion.div>
              </Button>
            </MotionFlex>
          ) : (
            <MotionFlex
              direction="column"
              gap="2"
              key="choose"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -25,
                transition: { duration: 0.25 },
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Button variant="surface" size="4">
                Connect wallet
              </Button>
              <Flex gap="2" align="center" justify="center">
                <Separator orientation="horizontal" size="4" />
                <Text as="div" size="1" color="gray" align="center">
                  or
                </Text>
                <Separator orientation="horizontal" size="4" />
              </Flex>
              <Button variant="surface" size="4" onClick={handleShowQR}>
                Manual payment
              </Button>
            </MotionFlex>
          )}
        </AnimatePresence>
      </Grid>
      <Text as="div" size="1" color="gray">
        Deposits must be made within 5 minutes of order creation. Late deposits
        will be swapped with a newer rate. <Link href="#">Learn more</Link>
      </Text>
    </MotionFlex>
  );
}
