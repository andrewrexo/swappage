import { Badge, Flex } from '@radix-ui/themes';

export interface AssetNameProps {
  assetName: string;
  assetSymbol: string;
  assetNetwork: string;
  align?: 'left' | 'right';
}

export function AssetName({ ...assetNameProps }: AssetNameProps) {
  const { assetNetwork } = assetNameProps;

  return (
    <Flex align="center" gap="4" className="pointer-events-none">
      <Badge size="1" variant="soft">
        {assetNetwork.toLocaleLowerCase()}
      </Badge>
    </Flex>
  );
}
