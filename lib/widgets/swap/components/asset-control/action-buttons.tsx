import { Flex, Button, Text, Badge } from '@radix-ui/themes';
import { ButtonGroup } from '../button-group';
import { PairRate } from '../../lib/exodus/rate';

interface ActionButtonsProps {
  side: 'from' | 'to';
  onMinClick: () => void;
  onMaxClick: () => void;
  onCustomClick: () => void;
  currentRate: PairRate;
}

export function ActionButtons({
  side,
  onMinClick,
  onMaxClick,
  onCustomClick,
  currentRate,
}: ActionButtonsProps) {
  return side === 'from' ? (
    <ButtonGroup size="2" variant="soft">
      <Button onClick={onMinClick}>
        <Text>Min</Text>
      </Button>
      <Button onClick={onMaxClick}>
        <Text>Max</Text>
      </Button>
      <Button onClick={onCustomClick}>
        <Text>$50</Text>
      </Button>
    </ButtonGroup>
  ) : (
    <Flex align="center" gap="2">
      <Badge
        variant="surface"
        style={{
          boxShadow: 'none',
          background: 'none',
          padding: '0',
        }}
        size="2"
        color="gray"
      >
        <Text>
          Network cost: ~{currentRate.minerFee.value.toFixed(5)}{' '}
          {currentRate.minerFee.assetId}
        </Text>
      </Badge>
    </Flex>
  );
}
