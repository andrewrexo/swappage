'use client';
import {
  Box,
  Button,
  Code,
  Flex,
  Grid,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes';
import { motion } from 'framer-motion';
import QRCode, { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

const MotionFlex = motion(Flex);

export function SwapMonitorWidget() {
  const [showQR, setShowQR] = useState(false);
  const [lastFetched, setLastFetched] = useState(Date.now());

  const handleShowQR = () => {
    setShowQR(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastFetched((prev) => Date.now());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MotionFlex
      gap="2"
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
            href="/order/or9knb1bh38"
            onClick={(e) => e.preventDefault()}
          >
            #94356
          </Link>
        </Box>
        <Box>
          <Text as="div" weight="bold" mb="1">
            Created
          </Text>
          <Text as="div" size="3">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </Box>
      </Flex>

      <Grid columns="1" py="2" className="space-y-4" mb="1">
        <Flex direction="column">
          <Text as="div" weight="bold" size="3" mb="1" align="left">
            Payment
          </Text>
          <Text as="div" size="2" mb="2">
            0.025 <Code variant="soft">BTC</Code> to{' '}
            <Code>1BaGcUCmXPzqxBAYHmuNU9J68rQA8nZRiP</Code>
          </Text>
          <Text as="div" size="1" color="gray" align="left">
            Last update: {new Date(lastFetched).toLocaleTimeString()}
          </Text>
        </Flex>

        <Separator orientation="horizontal" size="4" />
        {showQR ? (
          <Flex direction="column" gap="4">
            <Flex
              justify="center"
              align="center"
              direction="column"
              gap="2"
              className="rounded-lg p-4"
              style={{ backgroundColor: 'var(--gray-2)' }}
            >
              <QRCodeSVG value="https://www.google.com" />
              <Text as="div" size="2">
                Scan QR code with your wallet to pay
              </Text>
            </Flex>
            <Button variant="soft" size="4">
              Mark as paid
            </Button>
            <Button
              variant="soft"
              style={{ backgroundColor: 'transparent' }}
              size="2"
              onClick={() => {
                setShowQR(false);
              }}
            >
              Connect wallet
            </Button>
          </Flex>
        ) : (
          <Flex direction="column" gap="4">
            <Button variant="soft" size="4">
              Connect wallet
            </Button>
            <Text as="div" size="1" color="gray" align="center">
              or
            </Text>
            <Button variant="soft" size="4" onClick={handleShowQR}>
              Manual payment
            </Button>
          </Flex>
        )}
      </Grid>
      <Text as="div" size="1" color="gray">
        Deposits must be made within 5 minutes of order creation. Late deposits
        will be swapped with a newer rate. <Link href="/help">Learn more</Link>
      </Text>
    </MotionFlex>
  );
}
