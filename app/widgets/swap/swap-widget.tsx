import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  IconButton,
  Text,
} from '@radix-ui/themes';
import { MenuIcon } from 'lucide-react';

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
  const { width = '250px', height = '400px' } = swapWidgetProps;

  return (
    <Box width={width} height={height}>
      <Card asChild>
        <Grid columns={{ initial: '1' }} gap="3" width="auto" p="4">
          <Flex height="64px" justify="between">
            <Text size="4" weight="bold" className="text-accent">
              Swappage
            </Text>
            <IconButton variant="ghost">
              <MenuIcon />
            </IconButton>
          </Flex>
          <Flex justify="end">
            <Button size="3" className="w-full" variant="soft">
              Execute
            </Button>
          </Flex>
        </Grid>
      </Card>
    </Box>
  );
}
