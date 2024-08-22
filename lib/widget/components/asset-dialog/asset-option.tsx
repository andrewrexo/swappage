import { Flex, Text, Badge } from '@radix-ui/themes';
import { ExodusAsset } from '../../lib/exodus/asset';
import networkToColor from '../../features/assets/color';
import { twMerge } from 'tailwind-merge';
import { NetworkIcon, TokenIcon } from '@web3icons/react';

const networkToIcon = {
  ethereum: 'ethereum',
  arbitrumone: 'arbitrum-one',
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
  const iconId = (() => {
    const symbolLower = asset.symbol.toLowerCase();
    const knownTokens = {
      usdt: 'USDT',
      usdc: 'USDC',
    };

    for (const [token, id] of Object.entries(knownTokens)) {
      if (symbolLower.includes(token)) {
        return id;
      }
    }

    return asset.symbol;
  })();

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
      <Text as="div" color="gray">
        <Flex align="center" gap="2">
          <TokenIcon
            symbol={iconId}
            size={32}
            variant="branded"
            fallback={
              <NetworkIcon
                network={
                  networkToIcon[asset.network as keyof typeof networkToIcon]
                }
                variant="branded"
                size={32}
              />
            }
          />
          <Text
            weight="bold"
            size="4"
            className={twMerge(
              'flex items-center text-xl',
              asset.name.length > 14 ? 'text-sm' : '',
            )}
          >
            {asset.name}
          </Text>
          <Badge size="2" color={networkToColor[asset.network]}>
            {asset.symbol}&nbsp;
          </Badge>
          <Badge
            size="2"
            variant="surface"
            color={networkToColor[asset.network]}
          >
            {asset.network}
          </Badge>
        </Flex>
      </Text>
    </Flex>
  );
}
