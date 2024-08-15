import { Grid, Text, Box } from '@radix-ui/themes';
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
    <Box>
      <TopMovers />
      <Text size="1" color="gray">
        All assets
      </Text>
      <Grid
        gap="4"
        columns={{ initial: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
        width="auto"
        className="my-2 overflow-x-hidden overflow-y-scroll"
        maxHeight="200px"
        justify="between"
      >
        {assets.map((asset: ExodusAsset, index: number) => (
          <AssetOption key={asset.id + index} asset={asset} setOpen={setOpen} />
        ))}
      </Grid>
    </Box>
  ) : (
    <Text>No pairs available</Text>
  );
}
