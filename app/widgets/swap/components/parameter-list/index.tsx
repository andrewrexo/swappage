import { Code, Flex, Separator, Text } from '@radix-ui/themes';

interface ParameterListProps {
  rate: string;
  pair: string;
  provider: string;
}

const rateToWidgetDisplayText = (rate: string, pair: string) => {
  const [from, to] = pair.split('_');
  return `1 ${from} ~= ${rate} ${to}`;
};

export function ParameterList({ rate, pair, provider }: ParameterListProps) {
  return (
    <Flex direction="column" gap="2" className="h-full justify-center">
      <Flex align="center" justify="between">
        <Text size="1">Provider</Text>
        <Code size="1" variant="ghost" className="text-accent">
          {provider}
        </Code>
      </Flex>
      <Flex align="center" justify="between">
        <Text size="1">Rate</Text>
        <Code size="1" variant="ghost">
          {rateToWidgetDisplayText(rate, pair)}
        </Code>
      </Flex>
      <Flex align="center" justify="between">
        <Text size="1">Max slippage</Text>
        <Code size="1" variant="ghost">
          0.5%
        </Code>
      </Flex>
      <Flex align="center" justify="between">
        <Text size="1">Completion ETA</Text>
        <Code size="1" variant="ghost">
          ~18 minutes
        </Code>
      </Flex>
    </Flex>
  );
}
