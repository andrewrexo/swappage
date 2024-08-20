import { Flex, Text, Code, Badge, Link, Box, Card } from '@radix-ui/themes';
import { ExodusAsset } from '../../lib/exodus/asset';

const networkToColor: Record<
  string,
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'gray'
  | 'gold'
  | 'bronze'
  | 'brown'
  | 'amber'
  | 'tomato'
  | 'pink'
  | 'plum'
  | 'violet'
  | 'iris'
  | 'indigo'
> = {
  ethereum: 'blue',
  bitcoin: 'yellow',
  monero: 'orange',
  solana: 'violet',
  avalanche: 'ruby',
  polygon: 'purple',
  optimism: 'red',
  arbitrum: 'indigo',
};

export function AssetOption({
  asset,
  setOpen,
  handleAssetSelect,
}: {
  asset: ExodusAsset;
  setOpen: (open: boolean) => void;
  handleAssetSelect: (asset: ExodusAsset) => void;
}) {
  return (
    <Card
      className="min-h-12 bg-surface hover:opacity-90"
      onClick={() => handleAssetSelect(asset)}
    >
      <Text
        as="div"
        className="flex w-full items-center justify-between"
        color="gray"
      >
        <Flex align="center" gap="2">
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
