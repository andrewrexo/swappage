import { Grid, Text, Box, ScrollArea, Flex } from '@radix-ui/themes';
import { AssetOption } from './asset-option';
import { ExodusAsset } from '../../lib/exodus/asset';

export function AssetList({
  assets,
  setOpen,
  handleAssetSelect,
}: {
  assets: ExodusAsset[];
  setOpen: (open: boolean) => void;
  handleAssetSelect: (asset: ExodusAsset) => void;
}) {
  return assets.length > 0 ? (
    <Box my="2">
      <Text size="2" color="gray" my="2">
        All assets
      </Text>
      <ScrollArea>
        <Flex
          gap="2"
          width="auto"
          className="my-2 max-h-[400px]"
          direction="column"
        >
          {assets.slice(0, 35).map((asset: ExodusAsset, index: number) => (
            <AssetOption
              key={asset.id + index}
              asset={asset}
              setOpen={setOpen}
              handleAssetSelect={handleAssetSelect}
            />
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  ) : (
    <Text>No pairs available</Text>
  );
}
