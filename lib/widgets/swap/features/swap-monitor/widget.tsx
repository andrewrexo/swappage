'use client';
import { Box, Code, Flex, Grid, Link, Separator, Text } from '@radix-ui/themes';
import { GreenDot } from '../../components/green-dot';
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
      <Flex justify="between" align="center" height="100%">
        <Flex direction="column">
          <QRCodeSVG
            className="mx-auto"
            value="bitcoin:1BaGcUCmXPzqxBAYHmuNU9J68rQA8nZRiP"
          />
          <Text as="div" size="2" color="gray" mt="1" mb="2" align="center">
            Scan QR code to pay
          </Text>
        </Flex>
        <Separator
          size="3"
          orientation="vertical"
          className="w-2"
          style={{
            height: '140px',
          }}
        />
        <Flex direction="column">
          <QRCodeSVG
            className="mx-auto"
            value="bitcoin:1BaGcUCmXPzqxBAYHmuNU9J68rQA8nZRiP"
          />
          <Text as="div" size="2" color="gray" mt="1" mb="2" align="center">
            Scan QR code to pay
          </Text>
        </Flex>
      </Flex>
      <Grid columns="2" width="auto">
        <Flex gap="4" direction="column" pr="0">
          <Box>
            <Text as="div" weight="bold" size="2" mb="1">
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
            <Text as="div" weight="bold" size="2" mb="1">
              Created
            </Text>
            <Text as="div" size="3" mb="1">
              July 1, 2023, 10:28 AM
            </Text>
          </Box>
        </Flex>

        <Box position="relative" pt="1">
          <Box position="absolute" top="0" bottom="0" width="1px" ml="-0.5px">
            <Separator
              size="4"
              orientation="vertical"
              mt="2"
              style={{
                background:
                  'linear-gradient(to bottom, var(--teal-9) 90%, transparent)',
              }}
            />
          </Box>
          <Box pl="6">
            <Flex direction="column" gap="4">
              <Box>
                <GreenDot />
                <Text as="div" size="1" color="gray" mb="1">
                  {new Date().toLocaleString()}
                </Text>
                <Text as="p" size="2">
                  Package picked up from the warehouse in Phoenix, TX
                </Text>
              </Box>
              <Box>
                <GreenDot />
                <Text as="div" size="1" color="gray" mb="1">
                  {new Date(new Date().getTime() - 10005676).toLocaleString()}
                </Text>
                <Text as="p" size="2">
                  Departed from Phoenix, TX
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </MotionFlex>
  );
}
