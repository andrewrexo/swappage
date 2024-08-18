import { Code, Flex, IconButton, Text, Tooltip } from '@radix-ui/themes';
import { PairRate } from '../../lib/exodus/rate';
import { motion } from 'framer-motion';
import { UpdateIcon } from '@radix-ui/react-icons';
import { useAppDispatch } from '../../lib/hooks';
import { fetchPairRate } from '../../features/rates/slice';
import { twMerge } from 'tailwind-merge';

interface ParameterListProps {
  rate: PairRate;
  pair: string;
  provider: string;
  status: string;
}

const rateToWidgetDisplayText = (rate: number, pair: string) => {
  const [from, to] = pair.split('_');
  return (
    <Flex align="center" gap="1">
      <Code size="2">
        <Text size="1">1 </Text>
        {from}
      </Code>
      <Text size="2">for</Text>
      <Code size="2">
        <Text size="1">{rate.toFixed(6)} </Text>
        {to}
      </Code>
    </Flex>
  );
};

const etaAsReadableText = (eta: number) => {
  const minutes = Math.floor(eta / (60 * 1000));
  return `~${minutes} minute${minutes !== 1 ? 's' : ''}`;
};

const MotionText = motion(Text);

export function ParameterList({
  rate,
  pair,
  provider,
  status,
}: ParameterListProps) {
  const dispatch = useAppDispatch();
  const { amount, expiry } = rate;

  const eta = 18 * 60 * 1000;
  const etaText = etaAsReadableText(eta);

  const reloadRate = () => {
    if (status === 'loading') {
      return;
    }

    dispatch(fetchPairRate(pair));
  };

  return (
    <Flex direction="column" gap="4" mb="1">
      <Flex align="center" justify="between">
        <Flex align="center" gap="2">
          <Text size="2">Rate</Text>
          <Tooltip content="Refresh rate">
            <IconButton size="1" variant="ghost" onClick={reloadRate}>
              <UpdateIcon
                className={twMerge(
                  status === 'loading' && 'animate-spin transition-all',
                )}
                onClick={reloadRate}
              />
            </IconButton>
          </Tooltip>
        </Flex>
        <motion.div
          key={`rate-${rate.expiry}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-right"
        >
          {amount.value && rateToWidgetDisplayText(amount.value, pair)}
        </motion.div>
      </Flex>
      <Flex align="center" justify="between">
        <Text size="2" className="opacity-1">
          Provider
        </Text>
        <motion.div
          key={`provider-${provider}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-right"
        >
          <Text size="2" className="text-accent">
            {provider}
          </Text>
        </motion.div>
      </Flex>
      <Flex align="center" justify="between" gap="2">
        <Text size="2" className="opacity-1">
          Rate valid until
        </Text>
        <MotionText
          key={`provider-${provider}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-right"
          size="2"
        >
          {new Date(expiry).toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </MotionText>
      </Flex>
    </Flex>
  );
}
