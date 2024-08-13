import { Button, Flex, Text, Code } from '@radix-ui/themes';
import { ExodusAsset } from '../../lib/exodus/asset';

export function AssetOption({ asset }: { asset: ExodusAsset }) {
  return (
    <Button
      size="3"
      variant="outline"
      className="flex cursor-pointer flex-col bg-surface p-5"
    >
      <Text className="flex w-full items-center justify-between">
        <Flex align="center" gap="2">
          <Text weight="bold" size="2" className="flex items-center">
            {asset.symbol}&nbsp;
            <Code size="1" variant="soft">
              {asset.network}
            </Code>
          </Text>
        </Flex>
        <Code size="1" variant="ghost">
          {/*asset.price*/}
        </Code>
      </Text>
    </Button>
  );
}
