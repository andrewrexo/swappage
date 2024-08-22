import { Grid, Text, ScrollArea } from '@radix-ui/themes';
import { AssetOption } from './asset-option';
import { ExodusAsset } from '../../lib/exodus/asset';
import { useCallback, useRef, useEffect } from 'react';

export function AssetList({
  assets,
  onAssetSelect,
  onLoadMore,
}: {
  assets: ExodusAsset[];
  onAssetSelect: (asset: ExodusAsset) => void;
  onLoadMore: () => void;
}) {
  const trimmedAssets = useCallback(() => assets.slice(0, 50), [assets]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollArea;
      if (scrollHeight - scrollTop <= clientHeight + 1) {
        onLoadMore();
      }
    };

    scrollArea.addEventListener('scroll', handleScroll);
    return () => scrollArea.removeEventListener('scroll', handleScroll);
  }, [onLoadMore]);

  return assets.length > 0 ? (
    <ScrollArea data-vaul-no-drag ref={scrollAreaRef}>
      <Grid columns="1" gap="1" className="sm:max-h-[50dvh]">
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
