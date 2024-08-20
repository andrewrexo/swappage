import { Button, Flex, Text, Code, Badge, Link, Box } from '@radix-ui/themes';
import { ExodusAsset } from '../../lib/exodus/asset';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { setFromAsset, setToAsset } from '../../features/swap/slice';

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
}: {
  asset: ExodusAsset;
  setOpen: (open: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const { activeDirection } = useAppSelector((state) => state.swap);

  const handleAssetSelect = () => {
    if (activeDirection === 'from') {
      dispatch(setFromAsset(asset));
    } else {
      dispatch(setToAsset(asset));
    }

    setOpen(false);
  };

  return (
    <Box
      className="bg-surface p-2 transition-all duration-100 hover:brightness-125"
      onClick={handleAssetSelect}
    >
      <Link size="3" onClick={handleAssetSelect}>
        <Text as="div" className="flex w-full items-center justify-between">
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
      </Link>
    </Box>
  );
}
