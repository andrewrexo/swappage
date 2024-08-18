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
import { CopyIcon } from '@radix-ui/react-icons';

const MotionFlex = motion(Flex);
const MotionBadge = motion(Badge);

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
      <Flex gap="4" justify="between" className="w-full">
        <Box>
          <Text as="div" weight="bold" mb="1">
            Order number
          </Text>
          <Link
            tabIndex={2}
            underline="hover"
            highContrast
            size="3"
            href={`/order/${order.orderId}`}
            onClick={(e) => e.preventDefault()}
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
        <Flex direction="column">
          <Text as="div" weight="bold" size="3" mb="2" align="left">
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
          <Text as="div" size="1" color="gray" align="left" mt="4">
            Last update: {new Date(order.updated!).toLocaleTimeString()}
          </Text>
          <Separator orientation="horizontal" size="4" className="my-4 mb-2" />
          <Flex align="center" gap="2" key="header">
            <Text as="div" weight="bold" size="4" align="left">
              Deposit
            </Text>
            {showQR ? (
              <MotionBadge
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut', delay: 1 }}
              >
                Manual payment
              </MotionBadge>
            ) : null}
          </Flex>
        </Flex>
        <AnimatePresence mode="wait">
          {showQR ? (
            <MotionFlex
              direction="column"
              gap="4"
              key="qr"
              initial={{ opacity: 0, y: 25, height: '0px' }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.5, ease: 'easeInOut' },
              }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              mt="4"
            >
              <Flex
                justify="center"
                align="center"
                direction="column"
                gap="2"
                className="rounded-lg p-2 pt-0"
              >
                <QRCodeSVG value="https://www.google.com" />
                <Flex align="center" direction="column">
                  <Text style={{ maxWidth: '100%' }} size="1">
                    Pay to
                  </Text>
                  <Link
                    underline="always"
                    style={{ maxWidth: '100%' }}
                    size="1"
                  >
                    {order.payinAddress}
                  </Link>
                </Flex>
              </Flex>
              <Button variant="soft" size="4">
                Mark as paid
              </Button>
              <Button
                variant="soft"
                style={{ opacity: 0.5, backgroundColor: 'transparent' }}
                size="3"
                onClick={() => {
                  setShowQR(false);
                }}
              >
                Connect wallet
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
              <Button variant="soft" size="4" className="mt-2">
                Connect wallet
              </Button>
              <Text as="div" size="1" color="gray" align="center">
                or
              </Text>
              <Button variant="soft" size="4" onClick={handleShowQR}>
                Manual payment
              </Button>
            </MotionFlex>
          )}
        </AnimatePresence>
      </Grid>
      <Text as="div" size="1" color="gray">
        Deposits must be made within 5 minutes of order creation. Late deposits
        will be swapped with a newer rate. <Link href="/help">Learn more</Link>
      </Text>
    </MotionFlex>
  );
}
