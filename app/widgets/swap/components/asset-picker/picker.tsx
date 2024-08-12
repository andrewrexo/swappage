'use client';
import { Flex, TextField, Text, Skeleton } from '@radix-ui/themes';
import { AssetNameProps } from './asset-name';
import { useState } from 'react';

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

  return (
    <Flex direction="column" gap="2">
      <Skeleton loading={isLoading}>
        {side === 'from' ? (
          <Text size="1">bc1q...2761</Text>
        ) : (
          <Text size="1">0x07...AmX0</Text>
        )}
      </Skeleton>
      <Skeleton loading={isLoading}>
        <TextField.Root size="3" variant="soft">
          <TextField.Slot>{selectedAsset.assetSymbol}</TextField.Slot>
        </TextField.Root>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <Text size="1">$0.00</Text>
      </Skeleton>
    </Flex>
  );
}
