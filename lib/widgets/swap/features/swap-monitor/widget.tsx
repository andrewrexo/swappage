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

const MotionFlex = motion(Flex);

export function SwapMonitorWidget() {
  return (
    <MotionFlex
      gap="2"
      direction="column"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Flex direction="column">
        <Text as="div" weight="bold" size="3" mb="1" align="left">
          Payment
        </Text>
        <Text as="div" size="2" mb="2">
          0.025 <Code variant="soft">BTC</Code> to{' '}
          <Code>1BaGcUCmXPzqxBAYHmuNU9J68rQA8nZRiP</Code>
        </Text>
      </Flex>
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
      <Grid columns="3" pt="4">
        <Flex direction="column">
          <QRCodeSVG
            className="mx-auto"
            value="bitcoin:1BaGcUCmXPzqxBAYHmuNU9J68rQA8nZRiP"
          />
          <Text as="div" size="2" color="gray" mt="2" mb="2" align="center">
            Use your wallet to scan the QR code
          </Text>
        </Flex>
        <Text
          as="div"
          size="2"
          color="gray"
          align="center"
          className="flex h-[80%] items-center justify-center"
        >
          or
        </Text>
        <Flex direction="column" gap="2">
          <Button variant="classic">Connect</Button>
          <Text as="div" size="2" color="gray" align="center">
            Connect your wallet to pay
          </Text>
          <Separator size="4" className="my-2" />
          <Button variant="soft">Mark as paid</Button>
          <Text as="div" size="2" color="gray" align="center">
            Pay using QR code
          </Text>
        </Flex>
      </Grid>
      <Flex direction="column" gap="4" align="center" mt="2">
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
