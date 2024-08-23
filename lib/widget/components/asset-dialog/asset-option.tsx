import { Flex, Text, Badge, Box } from '@radix-ui/themes';
import { ExodusAsset } from '../../lib/exodus/asset';
import networkToColor from '../../features/assets/color';
import { twMerge } from 'tailwind-merge';
import { AssetIcon } from '../asset-icon';

export const getIconId = (assetSymbol: string): string => {
  const symbolLower = assetSymbol.toLowerCase();
  const knownTokens = {
    usdt: 'USDT',
    usdc: 'USDC',
  };

  for (const [token, id] of Object.entries(knownTokens)) {
    if (symbolLower.includes(token)) {
      return id;
    }
  }

  return assetSymbol;
};
export const networkToIcon = {
  ethereum: 'ethereum',
  ethereumarbone: 'arbitrum-one',
  basemainnet: 'base',
  matic: 'matic',
  solana: 'solana',
};

export function AssetOption({
  asset,
  onAssetSelect,
}: {
  asset: ExodusAsset;
  onAssetSelect: (asset: ExodusAsset) => void;
}) {
  return (
    <Flex
      className={twMerge(
        'flex w-full cursor-pointer rounded-lg',
        'px-2 py-4 sm:px-2',
        'bg-gradient-to-r from-[var(--gray-2)] to-[var(--gray-4)]',
        'transition-all duration-300',
      )}
      onClick={() => onAssetSelect(asset)}
      data-vaul-no-drag
    >
      <Text as="div" className="w-full">
        <Flex align="center" gap="2" width="100%">
          <Box
            className={twMerge(
              'flex items-center justify-center rounded-lg p-1',
              'bg-gradient-to-r',
              asset.network === 'ethereum' &&
                'from-[var(--blue-3)] to-[var(--blue-2)]',
              asset.network === 'ethereumarbone' &&
                'from-[var(--cyan-3)] to-[var(--cyan-2)]',
              asset.network === 'basemainnet' &&
                'from-[var(--indigo-3)] to-[var(--indigo-2)]',
              asset.network === 'matic' &&
                'from-[var(--violet-3)] to-[var(--violet-2)]',
              asset.network === 'solana' &&
                'from-[var(--teal-3)] to-[var(--teal-2)]',
            )}
          >
            <AssetIcon asset={asset} />
          </Box>
          <Text
            weight="medium"
            color={networkToColor[asset.network]}
            className={twMerge('... flex items-center truncate text-lg')}
          >
            {asset.name}
          </Text>
          <Badge size="1" color={networkToColor[asset.network]}>
            {asset.symbol}
          </Badge>
          <Badge
            size="2"
            variant="surface"
            color={networkToColor[asset.network]}
            style={{ marginLeft: 'auto' }}
          >
            {asset.network}
          </Badge>
        </Flex>
      </Text>
    </Flex>
  );
}
