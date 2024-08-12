'use client';
import { Flex, TextField, Text, Skeleton, IconButton } from '@radix-ui/themes';
import { AssetName, AssetNameProps } from './asset-name';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AssetDialog } from '../asset-dialog';

const demoAssets: AssetNameProps[] = [
  {
    assetName: 'Bitcoin',
    assetSymbol: 'BTC',
    assetNetwork: 'BTC',
  },
  {
    assetName: 'Ethereum',
    assetSymbol: 'ETH',
    assetNetwork: 'ETH',
  },
];

export function AssetPicker({ side }: { side: 'from' | 'to' }) {
  const [selectedAsset, setSelectedAsset] = useState<AssetNameProps>(
    side === 'from' ? demoAssets[0] : demoAssets[1],
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

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
            assetName={selectedAsset.assetName}
            assetSymbol={selectedAsset.assetSymbol}
            assetNetwork={selectedAsset.assetNetwork}
          />
        </Flex>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <TextField.Root size="3" className="cursor-pointer">
          <TextField.Slot>
            <Text size="3" weight="medium" className="text-accent">
              {selectedAsset.assetSymbol}
            </Text>
          </TextField.Slot>
          <TextField.Slot className="">
            <AssetDialog>
              <IconButton
                size="1"
                variant="ghost"
                className="cursor-pointer p-[0.1rem]"
              >
                <ChevronDown strokeWidth={1.5} />
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
