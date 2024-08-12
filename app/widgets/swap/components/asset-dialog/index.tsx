import {
  Dialog,
  Button,
  Text,
  Flex,
  TextField,
  Grid,
  Code,
} from '@radix-ui/themes';
import { SearchCheckIcon } from 'lucide-react';
import { TopMovers } from './top-movers';

const assets = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$0.00',
    network: 'Bitcoin',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$0.00',
    network: 'Ethereum',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    price: '$0.00',
    network: 'Ethereum',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    price: '$0.00',
    network: 'Ethereum',
  },
  {
    symbol: 'DAI',
    name: 'Dai',
    price: '$0.00',
    network: 'Ethereum',
  },
  {
    symbol: 'WETH',
    name: 'WETH',
    price: '$0.00',
    network: 'Ethereum',
  },
  {
    symbol: 'WBTC',
    name: 'WBTC',
    price: '$0.00',
    network: 'Ethereum',
  },
  {
    symbol: 'BUSD',
    name: 'BUSD',
    price: '$0.00',
    network: 'BSC',
  },
  {
    symbol: 'USDC.e',
    name: 'USDC.e',
    price: '$0.00',
    network: 'Ethereum',
  },
  {
    symbol: 'USDC.s',
    name: 'USDC.s',
    price: '$0.00',
    network: 'Solana',
  },
  {
    symbol: 'USDC.b',
    name: 'USDC.b',
    price: '$0.00',
    network: 'Bitcoin',
  },
  {
    symbol: 'USDC.b',
    name: 'USDC.b',
    price: '$0.00',
    network: 'Bitcoin',
  },
  {
    symbol: 'USDC.b',
    name: 'USDC.b',
    price: '$0.00',
    network: 'Bitcoin',
  },
];

export function AssetDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="flex flex-col gap-1">
        <Dialog.Title className="text-accent">Available assets</Dialog.Title>
        <TextField.Root size="3" placeholder="Search all available assets...">
          <TextField.Slot>
            <SearchCheckIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <TopMovers />
        <Text size="1" color="gray">
          All assets
        </Text>
        <Grid
          gap="4"
          columns={{ initial: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          width="auto"
          className="my-2 overflow-x-hidden overflow-y-scroll"
          maxHeight="200px"
          justify="between"
        >
          {assets.map((asset, index) => (
            <Button
              key={asset.symbol + index}
              size="1"
              variant="outline"
              className="flex cursor-pointer flex-col bg-surface p-5 transition-all"
            >
              <Text className="flex w-full items-center justify-between">
                <Flex align="center" gap="2">
                  <Text weight="bold">
                    {asset.symbol} -&nbsp;
                    <Code size="1" variant="soft">
                      {asset.network}
                    </Code>
                  </Text>
                </Flex>
                <Code size="1" variant="ghost">
                  {asset.price}
                </Code>
              </Text>
            </Button>
          ))}
        </Grid>
      </Dialog.Content>
    </Dialog.Root>
  );
}
