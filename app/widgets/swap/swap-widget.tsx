import {
  Box,
  Card,
  Flex,
  Grid,
  SegmentedControl,
  Text,
} from '@radix-ui/themes';
import { ArrowLeftRightIcon } from 'lucide-react';
import { AssetPicker } from './components/asset-picker/picker';
import { WidgetHeader } from './components/widget-header';
import { SwapButton } from './components/swap-button';

type SwapMode = 'input' | 'output' | 'flexible';
type RatesMode = 'fixed' | 'float';
type AssetDiscovery = 'enabled' | 'disabled' | (string & {});

export interface SwapWidgetProps {
  // todo: add props
  width: string;
  height: string;
  theme: 'light' | 'dark';
  backgroundColor: string;
  textColor: string;
  assetMode: SwapMode;
  ratesMode: RatesMode;
  assetDiscovery: AssetDiscovery;
}

export function SwapWidget({ ...swapWidgetProps }: SwapWidgetProps) {
  const { width = '30px', height = '400px' } = swapWidgetProps;

  return (
    <Box width={width} height={height}>
      <Card className="flex flex-col gap-4 p-4">
        <Flex justify="between">
          <Text size="5" weight="bold" className="text-accent">
            Swappage
          </Text>
          <WidgetHeader />
        </Flex>
        <Flex direction="column" align="center" gap="3">
          <AssetPicker side="from" />
          <AssetPicker side="to" />
        </Flex>
        <Flex justify="end">
          <SwapButton connected={true} />
        </Flex>
      </Card>
    </Box>
  );
}
