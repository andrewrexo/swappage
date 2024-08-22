import { Flex, Text, Badge } from '@radix-ui/themes';
import { ExodusAsset } from '../../lib/exodus/asset';
import networkToColor from '../../features/assets/color';
import { twMerge } from 'tailwind-merge';

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
        'px-1 py-3 sm:px-1',
        'bg-gradient-to-r from-[var(--gray-1)] to-[var(--gray-3)]',
        'transition-all duration-300',
      )}
      onClick={() => onAssetSelect(asset)}
      data-vaul-no-drag
    >
      <Text as="div" color="gray">
        <Flex align="center" gap="2">
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
