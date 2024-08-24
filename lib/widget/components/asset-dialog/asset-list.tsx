import { Grid, Text } from '@radix-ui/themes';
import { AssetOption } from './asset-option';
import { ExodusAsset } from '../../lib/exodus/asset';
import { useRef, useEffect, useCallback } from 'react';

export function AssetList({
  assets,
  onAssetSelect,
  onLoadMore,
  scrollToTop,
}: {
  assets: ExodusAsset[];
  onAssetSelect: (asset: ExodusAsset) => void;
  onLoadMore: () => void;
  scrollToTop: boolean;
}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollArea;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      scrollAreaRef.current.scrollTop = 0;
      onLoadMore();
    }
  }, [onLoadMore]);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    scrollArea.addEventListener('scroll', handleScroll);
    return () => scrollArea.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (scrollToTop && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  }, [scrollToTop]);

  return assets.length > 0 ? (
    <div
      ref={scrollAreaRef}
      className="relative overflow-y-auto pt-2 sm:max-h-[50dvh]"
    >
      <div className="relative">
        <Grid columns="1" gap="1">
          {assets.map((asset) => (
            <AssetOption
              key={asset.id}
              asset={asset}
              onAssetSelect={onAssetSelect}
            />
          ))}
        </Grid>
      </div>
    </div>
  ) : (
    <Text>No pairs available</Text>
  );
}
