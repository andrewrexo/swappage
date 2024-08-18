import { Flex, Text, Skeleton, Button, Badge } from '@radix-ui/themes';
import { AssetName } from './asset-name';
import {
  setActiveDirection,
  setFromAmount,
  setToAmount,
} from '../../features/swap/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { ChangeEvent, useEffect } from 'react';
import { InputAmount } from './input-amount';
import { ButtonGroup } from '../button-group';

export function AssetPicker({ side }: { side: 'from' | 'to' }) {
  const dispatch = useAppDispatch();
  const onDialogOpen = () => dispatch(setActiveDirection(side));

  const { currentRate } = useAppSelector((state) => state.rates);
  const { status } = useAppSelector((state) => state.assets);
  const { fromAsset, toAsset, fromAmount, toAmount } = useAppSelector(
    (state) => state.swap,
  );

  const selectedAsset = side === 'from' ? fromAsset : toAsset;

  useEffect(() => {
    if (side === 'to' && currentRate) {
      const calculatedValue = parseFloat(fromAmount) * currentRate.amount.value;
      dispatch(setToAmount(calculatedValue.toString()));
    }
  }, [currentRate, fromAmount, side, dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (side === 'from') {
      dispatch(setFromAmount(e.target.value));
    } else {
      dispatch(setToAmount(e.target.value));
    }
  };

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
    <Flex direction="column" gap="2" className="w-full">
      <Skeleton loading={status === 'loading'} maxWidth="100px">
        <Flex align="center" gap="2" justify="between">
          <AssetName
            assetName={selectedAsset.id}
            assetSymbol={selectedAsset.symbol}
            assetNetwork={selectedAsset.network}
          />
        </Flex>
      </Skeleton>
      <Skeleton loading={status === 'loading'}>
        <InputAmount
          asset={selectedAsset}
          side={side}
          onDialogOpen={onDialogOpen}
          onInputChange={handleInputChange}
        />
      </Skeleton>
      <Skeleton loading={status === 'loading'}>
        {currentRate && (
          <Flex justify="between">
            {side === 'from' ? (
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
            )}
            <Text size="2" color="gray" className="text-right">
              ${' '}
              {side === 'from'
                ? (currentRate.fromAssetFiat * parseFloat(fromAmount)).toFixed(
                    6,
                  )
                : (currentRate.toAssetFiat * parseFloat(toAmount)).toFixed(6)}
            </Text>
          </Flex>
        )}
      </Skeleton>
    </Flex>
  );
}
