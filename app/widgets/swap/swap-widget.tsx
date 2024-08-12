import { Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
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
      <Card asChild>
        <Grid columns={{ initial: '1' }} gap="8" width="auto" p="4">
          <Flex justify="between">
            <Text size="5" weight="bold" className="text-accent">
              Swappage
            </Text>
            <WidgetHeader />
          </Flex>
          <Flex justify="between" height="120px" align="center" gap="4">
            <AssetPicker side="from" />
            <ArrowLeftRightIcon className="h-10 w-10 text-accent" />
            <AssetPicker side="to" />
          </Flex>
          <Flex justify="end">
            <SwapButton connected={true} />
          </Flex>
        </Grid>
      </Card>
    </Box>
  );
}
