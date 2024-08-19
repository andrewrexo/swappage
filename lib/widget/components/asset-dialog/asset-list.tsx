import { Grid, Text, Box, ScrollArea, Flex } from '@radix-ui/themes';
import { TopMovers } from './top-movers';
import { AssetOption } from './asset-option';
import { ExodusAsset } from '../../lib/exodus/asset';

export function AssetList({
  assets,
  setOpen,
}: {
  assets: ExodusAsset[];
  setOpen: (open: boolean) => void;
}) {
  return assets.length > 0 ? (
    <Box my="2">
      <Text size="1" color="gray">
        All assets
      </Text>
      <ScrollArea>
        <Flex
          gap="4"
          width="auto"
          className="my-2 max-h-[600px] min-h-[400px]"
          direction="column"
        >
          {assets.slice(0, 50).map((asset: ExodusAsset, index: number) => (
            <AssetOption
              key={asset.id + index}
              asset={asset}
              setOpen={setOpen}
            />
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  ) : (
    <Text>No pairs available</Text>
  );
}
