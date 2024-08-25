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

export function AssetControl({
  side,
  setOpen,
}: {
  side: 'from' | 'to';
  setOpen: (open: boolean) => void;
}) {
  const dispatch = useAppDispatch();

  const onDialogOpen = (side: 'from' | 'to') => {
    dispatch(setActiveDirection(side));
    setOpen(true);
  };

  const { currentRate } = useAppSelector((state) => state.rates);
  const { assets } = useAppSelector((state) => state.assets);
  const { fromAsset, toAsset, fromAmount, toAmount } = useAppSelector(
    (state) => state.swap,
  );

  const selectedAsset = side === 'from' ? fromAsset : toAsset;

  useEffect(() => {
    if (!assets) {
      return;
    }

    if (side === 'to' && currentRate) {
      const calculatedValue = parseFloat(fromAmount) * currentRate.amount.value;
      dispatch(setToAmount(calculatedValue.toString()));
    }
  }, [currentRate, fromAmount, side, dispatch, assets]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!assets) {
      return;
    }

    if (side === 'from') {
      dispatch(setFromAmount(e.target.value));
    } else {
      dispatch(setToAmount(e.target.value));
    }
  };

  return (
    <Flex direction="column" gap="2" className="w-full">
      <Skeleton loading={!assets} maxWidth="100px">
        <Flex align="center" gap="2" justify="between">
          <AssetName
            key={`${side}-asset-name`}
            assetName={selectedAsset.id}
            assetSymbol={selectedAsset.symbol}
            assetNetwork={selectedAsset.network}
          />
        </Flex>
      </Skeleton>
      <Skeleton loading={!assets}>
        <InputAmount
          key={`${side}-input-amount`}
          asset={selectedAsset}
          side={side}
          onDialogOpen={onDialogOpen}
          onInputChange={handleInputChange}
        />
      </Skeleton>
      {currentRate && (
        <InputActions
          key={`${side}-input-actions`}
          side={side}
          fromAmount={fromAmount}
          toAmount={toAmount}
          currentRate={currentRate}
          loading={!assets}
        />
      )}
    </Flex>
  );
}
