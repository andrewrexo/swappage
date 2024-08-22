import { TextField, IconButton, Text, Box } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';
import { useAppSelector } from '../../lib/hooks';
import { ExodusAsset } from '../../lib/exodus/asset';
import { ChangeEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getIconId, networkToIcon } from '../asset-dialog/asset-option';
import { twMerge } from 'tailwind-merge';
import networkToColor from '../../features/assets/color';
import { AssetIcon } from '../asset-icon';

interface InputAmountProps {
  asset: ExodusAsset;
  side: 'from' | 'to';
  onDialogOpen: (side: 'from' | 'to') => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MotionText = motion(Text);

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
      <AnimatePresence mode="wait">
        <TextField.Slot>
          <MotionText
            size="3"
            weight="medium"
            as="div"
            className={twMerge(
              `flex cursor-pointer items-center gap-2`,
              asset.symbol.length >= 5 && 'max-w-[100px]',
              asset.symbol.length == 4 && 'max-w-[75px]',
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            key={asset.id}
            onClick={() => onDialogOpen(side)}
            color={networkToColor[asset.network]}
          >
            <Box maxWidth="24px" maxHeight="24px">
              <AssetIcon asset={asset} />
            </Box>
            {asset.symbol}
          </MotionText>
        </TextField.Slot>
      </AnimatePresence>
      <TextField.Slot className="">
        <IconButton
          size="1"
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
