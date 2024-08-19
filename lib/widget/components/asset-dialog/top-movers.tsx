import { RadioCards, Flex, Text, Box } from '@radix-ui/themes';
import { ArrowUpCircle } from 'lucide-react';

export function TopMovers() {
  return (
    <Box className="my-2">
      <Text size="1" color="gray">
        Moving fast
      </Text>
      <Flex
        justify="between"
        gap="4"
        align="center"
        className="overflow-hidden py-2 pb-2"
      >
        <RadioCards.Root className="flex w-full justify-between">
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
