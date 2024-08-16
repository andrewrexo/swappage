import { Button, Flex, Text, Code } from '@radix-ui/themes';
import { ExodusAsset } from '../../lib/exodus/asset';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { setFromAsset, setToAsset } from '../../features/swap/slice';

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
    <Button
      size="3"
      variant="outline"
      className="flex cursor-pointer flex-col bg-surface p-5"
      onClick={handleAssetSelect}
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
