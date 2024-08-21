import { Flex, Text, Badge, Card } from '@radix-ui/themes';
import { ExodusAsset } from '../../lib/exodus/asset';
import networkToColor from '../../features/assets/color';

export function AssetOption({
  asset,
  onAssetSelect,
}: {
  asset: ExodusAsset;
  onAssetSelect: (asset: ExodusAsset) => void;
}) {
  return (
    <Card
      className="min-h-12 hover:opacity-90"
      onClick={() => onAssetSelect(asset)}
    >
      <Text as="div" color="gray">
        <Flex align="center" gap="2" pb="1">
          <Text
            weight="bold"
            size={asset.name.length > 10 ? '1' : '2'}
            className="flex items-center"
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
