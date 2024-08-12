import { Flex, Text } from '@radix-ui/themes';

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
    <Flex direction="column" gap="2">
      <Flex align="center" justify="between">
        <Text size="1">Rate</Text>
        <Text size="1">{rateToWidgetDisplayText(rate, pair)}</Text>
      </Flex>
      <Flex align="center" justify="between">
        <Text size="1">Provider</Text>
        <Text size="1" className="text-accent">
          {provider}
        </Text>
      </Flex>
    </Flex>
  );
}
