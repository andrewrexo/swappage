'use server';

import { Grid, Text, Box } from '@radix-ui/themes';
import { TopMovers } from './top-movers';
import getAvailableAssets, { ExodusAsset } from '../../lib/exodus/asset';
import { AssetOption } from './asset-option';

export default async function AssetList() {
  const assets = await getAvailableAssets(['solana', 'basemainnet']);

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
        {assets.slice(0, 10).map((asset: ExodusAsset, index: number) => (
          <AssetOption key={asset.id + index} asset={asset} />
        ))}
      </Grid>
    </Box>
  ) : (
    <Text>No pairs available</Text>
  );
}
