import { Flex, TextField, Text, Skeleton, IconButton } from '@radix-ui/themes';
import { AssetName, AssetNameProps } from './asset-name';
import { ChevronDown } from 'lucide-react';
import { AssetDialog } from '../asset-dialog';
import { setActiveDirection } from '../../features/swap/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';

export function AssetPicker({ side }: { side: 'from' | 'to' }) {
  const dispatch = useAppDispatch();
  const onDialogOpen = () => dispatch(setActiveDirection(side));
  const { status, assets } = useAppSelector((state) => state.assets);
  const { fromAsset, toAsset } = useAppSelector((state) => state.swap);

  const selectedAsset = side === 'from' ? fromAsset : toAsset;
  const isLoading =
    status == 'loading' && selectedAsset === null ? true : false;

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
        <TextField.Root size="3" className="cursor-pointer">
          <TextField.Slot>
            <Text size="3" weight="medium" className="text-accent">
              {selectedAsset.symbol}
            </Text>
          </TextField.Slot>
          <TextField.Slot className="">
            <AssetDialog side={side}>
              <IconButton size="1" variant="soft" className="cursor-pointer">
                <ChevronDown strokeWidth={1.5} onClick={onDialogOpen} />
              </IconButton>
            </AssetDialog>
          </TextField.Slot>
        </TextField.Root>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <Text size="1">$0.00</Text>
      </Skeleton>
    </Flex>
  );
}
