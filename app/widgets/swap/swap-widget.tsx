import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  IconButton,
  Text,
} from '@radix-ui/themes';
import { ArrowLeftRightIcon, MenuIcon } from 'lucide-react';
import { AssetPicker } from './components/asset-picker/picker';

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
            <Text size="4" weight="bold" className="text-accent">
              Swappage
            </Text>
            <IconButton variant="ghost">
              <MenuIcon />
            </IconButton>
          </Flex>
          <Flex justify="between" height="120px" align="center" gap="4">
            <AssetPicker side="from" />
            <ArrowLeftRightIcon className="h-10 w-10 text-accent" />
            <AssetPicker side="to" />
          </Flex>
          <Flex justify="end">
            <Button size="3" className="w-full" variant="soft">
              Swap now
            </Button>
          </Flex>
        </Grid>
      </Card>
    </Box>
  );
}
