import { Flex, Skeleton } from '@radix-ui/themes';
import { AssetName } from './asset-name';
import {
  setActiveDirection,
  setFromAmount,
  setToAmount,
} from '../../features/swap/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { ChangeEvent, useEffect } from 'react';
import { InputAmount } from './input-amount';
import { InputActions } from './input-actions';

export function AssetControl({ side }: { side: 'from' | 'to' }) {
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
      {currentRate && (
        <InputActions
          side={side}
          fromAmount={fromAmount}
          toAmount={toAmount}
          currentRate={currentRate}
          loading={status === 'loading'}
        />
      )}
    </Flex>
  );
}
