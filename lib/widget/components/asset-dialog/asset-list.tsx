import { Grid, Text, ScrollArea } from '@radix-ui/themes';
import { AssetOption } from './asset-option';
import { ExodusAsset } from '../../lib/exodus/asset';
import { useCallback } from 'react';

export function AssetList({
  assets,
  onAssetSelect,
}: {
  assets: ExodusAsset[];
  onAssetSelect: (asset: ExodusAsset) => void;
}) {
  const trimmedAssets = useCallback(() => {
    return assets.slice(0, 20);
  }, [assets]);

  return assets.length > 0 ? (
    <ScrollArea>
      <Grid columns="1" gap="4" className="sm:max-h-[40dvh]">
        {trimmedAssets().map((asset: ExodusAsset, index: number) => (
          <AssetOption
            key={asset.id + index}
            asset={asset}
            onAssetSelect={onAssetSelect}
          />
        ))}
      </Grid>
    </ScrollArea>
  ) : (
    <Text>No pairs available</Text>
  );
}
