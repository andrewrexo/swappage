import { Box, Flex, Separator, Text } from '@radix-ui/themes';
import { AssetPicker } from './components/asset-picker/picker';
import { WidgetHeader } from './components/widget-header';
import { SwapButton } from './components/swap-button';
import { ParameterList } from './components/parameter-list';
import { twMerge } from 'tailwind-merge';

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
  className: string;
}

export function SwapWidget({ ...swapWidgetProps }: SwapWidgetProps) {
  const { width, height, className } = swapWidgetProps;

  // todo: determine where to store rates and pair. maybe consider using redux?
  const swapBaseParameters = {
    rate: '22.227161591',
    pair: 'BTC_ETH',
    status: 'online',
    provider: 'XOSwap',
  };

  return (
    <Box
      width={{ initial: '100%', sm: width }}
      minHeight={height}
      className={twMerge(className, ``)}
    >
      <Flex
        direction="column"
        className={twMerge(
          'gap-4 rounded-xl border-[1px] border-accent p-4 shadow-sm outline-yellow-500',
          className,
        )}
      >
        <Flex justify="between">
          <Text
            size="5"
            weight="bold"
            className="user-select-none pointer-events-none text-accent"
          >
            Swappage
          </Text>
          <WidgetHeader />
        </Flex>
        <Flex direction="column" align="center" gap="3">
          <AssetPicker side="from" />
          <AssetPicker side="to" />
        </Flex>
        <ParameterList {...swapBaseParameters} />
        <Separator size="4" className="my-1" />
        <Flex
          justify="end"
          direction="column"
          className="transition-all duration-200"
        >
          <SwapButton connected={true} />
        </Flex>
      </Flex>
    </Box>
  );
}
