import { Flex, Text, Badge } from '@radix-ui/themes';
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
  solana: 'solana',
};

export function AssetOption({
  asset,
  onAssetSelect,
}: {
  asset: ExodusAsset;
  onAssetSelect: (asset: ExodusAsset) => void;
}) {
  const iconId = getIconId(asset.symbol);

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
      <Text as="div" color="gray" className="w-full">
        <Flex align="center" gap="2" width="100%">
          <AssetIcon asset={asset} />
          <Text
            weight="bold"
            className={twMerge(
              'flex items-center text-xl',
              asset.name.length > 14 ? 'text-xs' : '',
            )}
          >
            {asset.name}
          </Text>
          <Badge size="1" color={networkToColor[asset.network]}>
            {asset.symbol}&nbsp;
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
