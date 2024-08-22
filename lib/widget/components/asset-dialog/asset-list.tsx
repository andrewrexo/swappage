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
  const trimmedAssets = useCallback(() => assets.slice(0, 50), [assets]);

  return assets.length > 0 ? (
    <ScrollArea data-vaul-no-drag>
      <Grid columns="1" gap="1" className="mt-[-10px] sm:max-h-[50dvh]">
        {trimmedAssets().map((asset) => (
          <AssetOption
            key={asset.id}
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
