import { Flex, Text, Badge, Card } from '@radix-ui/themes';
import { ExodusAsset } from '../../lib/exodus/asset';
import networkToColor from '../../features/assets/color';

export function AssetOption({
  asset,
  onAssetSelect,
  small,
}: {
  asset: ExodusAsset;
  onAssetSelect: (asset: ExodusAsset) => void;
  small?: boolean;
}) {
  return (
    <Card
      className="flex w-full cursor-pointer shadow-md shadow-[var(--color-overlay)] transition-all hover:scale-[0.95]"
      onClick={() => onAssetSelect(asset)}
      data-vaul-no-drag
    >
      <Text as="div" color="gray">
        <Flex align="center" gap="2" pb="1">
          <Text
            weight="bold"
            size={asset.name.length > 10 || small ? '4' : '5'}
            className="flex items-center"
            color={networkToColor[asset.network]}
          >
            {asset.name}
          </Text>
          <Badge
            size="1"
            variant="surface"
            color={networkToColor[asset.network]}
          >
            {asset.network}
          </Badge>
        </Flex>
        <Text size="2">{asset.symbol}&nbsp;</Text>
      </Text>
    </Card>
  );
}
