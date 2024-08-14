import { Flex, Text, Skeleton } from '@radix-ui/themes';
import { AssetName } from './asset-name';
import {
  setActiveDirection,
  setFromAmount,
  setToAmount,
} from '../../features/swap/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { ChangeEvent, useEffect } from 'react';
import { InputAmount } from './input-amount';

export function AssetPicker({ side }: { side: 'from' | 'to' }) {
  const dispatch = useAppDispatch();
  const onDialogOpen = () => dispatch(setActiveDirection(side));

  const { currentRate } = useAppSelector((state) => state.rates);
  const { status } = useAppSelector((state) => state.assets);
  const { fromAsset, toAsset, fromAmount } = useAppSelector(
    (state) => state.swap,
  );

  const selectedAsset = side === 'from' ? fromAsset : toAsset;
  const isLoading =
    status == 'loading' && selectedAsset === null ? true : false;

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

  return (
    <Flex direction="column" gap="2" className="w-full">
      <Skeleton loading={isLoading} maxWidth="100px">
        <Flex align="center" gap="2" justify="between">
          {side === 'from' ? (
            <Text size="1">bc1q...2761</Text>
          ) : (
            <Text size="1">0x07...AmX0</Text>
          )}
          <AssetName
            assetName={selectedAsset.id}
            assetSymbol={selectedAsset.symbol}
            assetNetwork={selectedAsset.network}
          />
        </Flex>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <InputAmount
          asset={selectedAsset}
          side={side}
          onDialogOpen={onDialogOpen}
          onInputChange={handleInputChange}
        />
      </Skeleton>
      <Skeleton loading={isLoading}>
        <Text size="1">$0.00</Text>
      </Skeleton>
    </Flex>
  );
}
