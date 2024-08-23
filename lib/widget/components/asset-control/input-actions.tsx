import { Flex, Skeleton, Text } from '@radix-ui/themes';
import { ActionButtons } from './action-buttons';
import { useAppDispatch, useMediaQuery } from '../../lib/hooks';
import { setFromAmount } from '../../features/swap/slice';
import { PairRate } from '../../lib/exodus/rate';

interface InputActionsProps {
  side: 'from' | 'to';
  fromAmount: string;
  toAmount: string;
  currentRate: PairRate;
  loading: boolean;
}

export function InputActions({
  side,
  fromAmount,
  toAmount,
  currentRate,
  loading,
}: InputActionsProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const dispatch = useAppDispatch();

  const onMinClick = () => {
    if (currentRate) {
      dispatch(setFromAmount(currentRate.min.value.toString()));
    }
  };

  const onMaxClick = () => {
    if (currentRate) {
      dispatch(setFromAmount(currentRate.max.value.toString()));
    }
  };

  const onCustomClick = () => {
    if (currentRate) {
      const amountOfAsset = 50 / currentRate.fromAssetFiat;
      dispatch(setFromAmount(amountOfAsset.toString()));
    }
  };

  return (
    <Skeleton loading={loading}>
      <Flex justify="between">
        <ActionButtons
          side={side}
          onMinClick={onMinClick}
          onMaxClick={onMaxClick}
          onCustomClick={onCustomClick}
          currentRate={currentRate}
        />
        {currentRate && currentRate.fromAssetFiat && (
          <Text size={isMobile ? `1` : `2`} color="gray" className="text-right">
            $
            {side === 'from'
              ? (currentRate.fromAssetFiat * parseFloat(fromAmount)).toFixed(4)
              : (currentRate.toAssetFiat * parseFloat(toAmount)).toFixed(4)}
          </Text>
        )}
      </Flex>
    </Skeleton>
  );
}
