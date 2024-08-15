import { Code, Flex, Text } from '@radix-ui/themes';
import { PairRate } from '../../lib/exodus/rate';
import { motion } from 'framer-motion';

interface ParameterListProps {
  rate: PairRate;
  pair: string;
  provider: string;
}

const rateToWidgetDisplayText = (rate: number, pair: string) => {
  const [from, to] = pair.split('_');
  return `1 ${from} ~= ${rate.toFixed(6)} ${to}`;
};

export function ParameterList({ rate, pair, provider }: ParameterListProps) {
  const { amount, expiry } = rate;

  return (
    <div className="grid grid-cols-2">
      <Text size="1" className="opacity-1">
        Provider
      </Text>
      <motion.div
        key={`provider-${rate.expiry}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-right"
      >
        <Code size="1" variant="ghost" className="text-accent">
          {provider}
        </Code>
      </motion.div>

      <Text size="1">Rate</Text>
      <motion.div
        key={`rate-${rate.expiry}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-right"
      >
        <Code size="1" variant="ghost">
          {amount.value && rateToWidgetDisplayText(amount.value, pair)}
        </Code>
      </motion.div>

      <Text size="1">Max slippage</Text>
      <motion.div
        key={`slippage-${rate.expiry}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-right"
      >
        <Code size="1" variant="ghost">
          0.5%
        </Code>
      </motion.div>

      <Text size="1">Completion ETA</Text>
      <motion.div
        key={`eta-${rate.expiry}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-right"
      >
        <Code size="1" variant="ghost">
          ~18 minutes
        </Code>
      </motion.div>
    </div>
  );
}
