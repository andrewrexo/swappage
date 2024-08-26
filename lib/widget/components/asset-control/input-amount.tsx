import { TextField, IconButton, Text } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';
import { useAppSelector } from '../../lib/hooks';
import { ExodusAsset } from '../../lib/exodus/asset';
import { ChangeEvent } from 'react';
import { AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import networkToColor from '../../features/assets/color';
import { AssetIcon } from '../asset-icon';
import { MotionFlexUnstyled } from '../ui/radix-motion';

interface InputAmountProps {
  asset: ExodusAsset;
  side: 'from' | 'to';
  onDialogOpen: (side: 'from' | 'to') => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function InputAmount({
  asset,
  side,
  onDialogOpen,
  onInputChange,
}: InputAmountProps) {
  const { status: rateStatus } = useAppSelector((state) => state.rates);
  const { fromAmount, toAmount } = useAppSelector((state) => state.swap);

  return (
    <TextField.Root
      aria-label={`${side}-amount-input`}
      name={`${side}-amount-input`}
      key={`${side}-amount-input-root`}
      size="3"
      variant="surface"
      color="gray"
      className="cursor-pointer overflow-hidden"
      value={side === 'from' ? fromAmount : toAmount}
      onChange={onInputChange}
    >
      <AnimatePresence mode="wait">
        <TextField.Slot
          style={{ padding: '0px', minWidth: '100px' }}
          key={`${side}-amount-input-slot`}
        >
          <MotionFlexUnstyled
            gap="2"
            align="center"
            direction="row"
            {...(asset.symbol.length >= 4 && {
              justify: 'center',
            })}
            onClick={() => onDialogOpen(side)}
            className={twMerge('mr-2 px-2', 'h-full w-full', `cursor-pointer`)}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            key={`${side}-amount-input-${asset.id}`}
          >
            {asset.symbol.length <= 4 && (
              <AssetIcon key={`asset-icon-${asset.id}`} asset={asset} />
            )}
            <Text
              key={`asset-symbol-${asset.id}`}
              color={networkToColor[asset.network]}
              weight="bold"
            >
              {asset.symbol}
            </Text>
          </MotionFlexUnstyled>
        </TextField.Slot>
      </AnimatePresence>
      <TextField.Slot className="">
        <IconButton
          size="1"
          name="select-asset"
          variant="soft"
          className="cursor-pointer"
          loading={rateStatus === 'loading'}
        >
          <ChevronDown strokeWidth={1.5} onClick={() => onDialogOpen(side)} />
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  );
}
