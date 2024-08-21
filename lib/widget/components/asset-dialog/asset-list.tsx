import { Grid, Text, ScrollArea } from '@radix-ui/themes';
import { AssetOption } from './asset-option';
import { ExodusAsset } from '../../lib/exodus/asset';
import { useCallback } from 'react';

export function AssetList({
  assets,
  onAssetSelect,
  small = false,
}: {
  assets: ExodusAsset[];
  onAssetSelect: (asset: ExodusAsset) => void;
  small?: boolean;
}) {
  const trimmedAssets = useCallback(() => assets.slice(0, 50), [assets]);

  return assets.length > 0 ? (
    <ScrollArea data-vaul-no-drag>
      <Grid columns="1" gap="2" className="m-[0.1rem] sm:max-h-[40dvh]">
        {trimmedAssets().map((asset) => (
          <AssetOption
            key={asset.id}
            asset={asset}
            onAssetSelect={onAssetSelect}
            small={small}
          />
        ))}
      </Grid>
    </ScrollArea>
  ) : (
    <Text>No pairs available</Text>
  );
}
