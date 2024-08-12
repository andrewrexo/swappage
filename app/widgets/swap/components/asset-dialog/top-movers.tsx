import { RadioCards, Flex, Text, Box, Heading } from '@radix-ui/themes';
import {
  ArrowDownCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUp01Icon,
  ArrowUpCircle,
  CircleArrowRightIcon,
} from 'lucide-react';

export function TopMovers() {
  return (
    <Box className="my-2">
      <Text size="1" color="gray">
        Moving fast
      </Text>
      <Flex justify="between" gap="4" align="center" className="py-2 pb-0">
        <RadioCards.Root className="flex w-full justify-between overflow-x-scroll">
          <RadioCards.Item value="1" className="w-full">
            <Flex direction="column" className="w-full">
              <Text weight="bold" className="text-accent">
                BTC
              </Text>
              <Text size="1" color="jade">
                3.4% <ArrowUpCircle className="inline-block" size={12} />
              </Text>
            </Flex>
          </RadioCards.Item>
          <RadioCards.Item value="2" className="w-full">
            <Flex direction="column" className="w-full">
              <Text weight="bold" className="text-accent">
                ETH
              </Text>
              <Text size="1" color="jade">
                6.1% <ArrowUpCircle className="inline-block" size={12} />
              </Text>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
      </Flex>
    </Box>
  );
}
