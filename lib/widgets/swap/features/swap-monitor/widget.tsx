'use client';
import {
  Badge,
  Box,
  Button,
  Card,
  Code,
  Flex,
  Grid,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionFlex = motion(Flex);

export function SwapMonitorWidget() {
  const [showQR, setShowQR] = useState(false);

  const handleShowQR = () => {
    setShowQR(true);
  };

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
            July 1, 2023, 10:28 AM
          </Text>
        </Box>
      </Flex>

      <Grid columns="1" py="2" className="space-y-4">
        <Flex direction="column">
          <Text as="div" weight="bold" size="3" mb="1" align="left">
            Payment
          </Text>
          <Text as="div" size="2" mb="2">
            0.025 <Code variant="soft">BTC</Code> to{' '}
            <Code>1BaGcUCmXPzqxBAYHmuNU9J68rQA8nZRiP</Code>
          </Text>
        </Flex>
        {showQR ? (
          <Flex direction="column" justify="center" align="center">
            <QRCodeSVG
              className="mx-auto"
              value="bitcoin:1BaGcUCmXPzqxBAYHmuNU9J68rQA8nZRiP"
              size={148}
            />
            <Text as="div" size="2" color="gray" my="2" mb="4" align="center">
              Scan QR code
            </Text>
            <Button
              variant="soft"
              size="3"
              className="w-full"
              onClick={() => {
                setShowQR(false);
              }}
            >
              Mark as Paid
            </Button>
            <Text as="div" size="2" color="gray" align="center" mt="3" mb="4">
              or
            </Text>
            <Button
              variant="classic"
              size="3"
              className="w-full"
              onClick={() => {
                setShowQR(false);
              }}
            >
              Connect
            </Button>
          </Flex>
        ) : (
          <Flex direction="column" gap="2">
            <QRCodeSVG
              className="mx-auto"
              value="bitcoin:1BaGcUCmXPzqxBAYHmuNU9J68rQA8nZRiP"
              size={148}
            />
            <Text as="div" size="3" color="gray" my="2" mb="2" align="center">
              Pay using <Link>QR code</Link>
            </Text>
            <Button variant="soft" size="3">
              Manual payment
            </Button>
            <Text as="div" size="1" color="gray" align="center">
              or
            </Text>
            <Button variant="soft" size="3">
              Connect wallet
            </Button>
          </Flex>
        )}
      </Grid>
      <Separator size="4" className="my-2" />

      <Flex direction="column" gap="4" align="center">
        <Card>
          <Flex gap="2" align="center" mb="1" justify="between">
            <Text as="div" size="2" weight="medium" className="text-accent">
              Swap created
            </Text>
            <Text as="div" size="1" color="gray">
              {new Date().toLocaleString()}
            </Text>
          </Flex>
          <Text as="div" size="2">
            Swap successfully created - the page will update once it&apos;s
            complete. Please notify us when you&apos;ve sent 0.025 BTC to the
            deposit address.
          </Text>
        </Card>
      </Flex>
    </MotionFlex>
  );
}
