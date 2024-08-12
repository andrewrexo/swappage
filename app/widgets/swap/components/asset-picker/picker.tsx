'use client';
import { Flex, TextField, Text, Skeleton } from '@radix-ui/themes';
import { AssetName, AssetNameProps } from './asset-name';
import { useEffect, useState } from 'react';
import { ChevronDown, SidebarOpenIcon } from 'lucide-react';

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
        <TextField.Root size="3">
          <TextField.Slot className="cursor-pointer text-accent">
            <Text size="2" weight="medium">
              {selectedAsset.assetSymbol}
            </Text>
          </TextField.Slot>
          <TextField.Slot className="cursor-pointer text-accent">
            <ChevronDown className="transition-all duration-200 hover:animate-pulse" />
          </TextField.Slot>
        </TextField.Root>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <Text size="1">$0.00</Text>
      </Skeleton>
    </Flex>
  );
}
