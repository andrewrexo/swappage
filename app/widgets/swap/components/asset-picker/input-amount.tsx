import { TextField, IconButton, Text, Spinner } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';
import { AssetDialog } from '../asset-dialog';
import { useAppSelector } from '../../lib/hooks';
import { ExodusAsset } from '../../lib/exodus/asset';
import { ChangeEvent } from 'react';

interface InputAmountProps {
  asset: ExodusAsset;
  side: 'from' | 'to';
  onDialogOpen: () => void;
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
      size="3"
      className="cursor-pointer"
      value={side === 'from' ? fromAmount : toAmount}
      onChange={onInputChange}
    >
      <TextField.Slot>
        <Text size="3" weight="medium" className="text-accent">
          {asset.symbol}
        </Text>
      </TextField.Slot>
      <TextField.Slot className="">
        <AssetDialog side={side}>
          <IconButton
            size="1"
            variant="soft"
            className="cursor-pointer"
            loading={rateStatus === 'loading'}
          >
            <ChevronDown strokeWidth={1.5} onClick={onDialogOpen} />
          </IconButton>
        </AssetDialog>
      </TextField.Slot>
    </TextField.Root>
  );
}
