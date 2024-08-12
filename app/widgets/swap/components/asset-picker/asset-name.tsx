import { Badge, Button, Flex, Text } from '@radix-ui/themes';

export interface AssetNameProps {
  assetName: string;
  assetSymbol: string;
  assetNetwork: string;
  align?: 'left' | 'right';
}

export function AssetName({ align, ...assetNameProps }: AssetNameProps) {
  const { assetName, assetSymbol = '???', assetNetwork } = assetNameProps;

  return (
    <Flex align="center" gap="4" className="pointer-events-none">
      <Badge size="1" variant="soft">
        {assetName.toLocaleLowerCase()}
      </Badge>
    </Flex>
  );
}
