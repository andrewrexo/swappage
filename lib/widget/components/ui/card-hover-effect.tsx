import { Text, Flex, Badge, Box } from '@radix-ui/themes';
import networkToColor from '../../features/assets/color';
import type { MouseEvent } from 'react';
import { AssetIcon } from '../asset-icon';

const networkToDisplayName = {
  ETH: 'Ethereum',
  solana: 'Solana',
  base: 'Base',
  matic: 'Polygon',
  'arbitrum-one': 'Arbitrum',
};

export const HoverEffect = ({
  networks,
  className,
  onNetworkBadgeClick,
}: {
  networks: string[];
  className?: string;
  onNetworkBadgeClick?: (network: string) => void;
}) => {
  const handleMouseEnter = (
    e: MouseEvent<HTMLSpanElement>,
    network: string,
  ) => {
    const { currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const parentRect = currentTarget.parentElement!.getBoundingClientRect();
    const x = rect.left - parentRect.left;
    const y = rect.top - parentRect.top;

    updateParentStyles(
      currentTarget.parentElement as HTMLElement,
      x,
      y,
      network,
    );
    updateBadgeStyles(currentTarget.children[1] as HTMLElement, true);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLSpanElement>) => {
    const { currentTarget } = e;
    updateBadgeStyles(currentTarget.children[1] as HTMLElement, false);
    resetTokenIconOpacity(currentTarget.parentElement as HTMLElement);
  };

  return (
    <Flex
      gap="2"
      align="center"
      as="div"
      className={`group relative ${className || ''}`}
    >
      <Box
        className="absolute block h-[40px] w-[40px] rounded-xl opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100"
        style={{
          transform: 'translate(var(--hover-x, 0px), var(--hover-y, 0px))',
          height: '40px',
        }}
      />
      {networks.map((network) => (
        <Text
          key={network}
          onClick={() => onNetworkBadgeClick?.(network)}
          className="relative mt-1 flex h-[40px] w-[40px] cursor-pointer items-center justify-center transition-all duration-300"
          onMouseEnter={(e) => handleMouseEnter(e, network)}
          onMouseLeave={handleMouseLeave}
        >
          <AssetIcon
            asset={{ symbol: network, network }}
            size={32}
            className="cursor-pointer rounded-full transition-all duration-300"
          />
          <Badge
            color={networkToColor[network]}
            className="absolute opacity-0 transition-all delay-300 duration-300"
            highContrast
          >
            {networkToDisplayName[network as keyof typeof networkToDisplayName]}
          </Badge>
        </Text>
      ))}
    </Flex>
  );
};

// Helper functions
const updateParentStyles = (
  parent: HTMLElement,
  x: number,
  y: number,
  network: string,
) => {
  parent.style.setProperty('--hover-x', `${x}px`);
  parent.style.setProperty('--hover-y', `${y}px`);
  (parent.children[0] as HTMLElement).style.setProperty(
    'background',
    `var(--${networkToColor[network]}-4)`,
  );
};

const updateBadgeStyles = (badge: HTMLElement, isHovering: boolean) => {
  badge.style.setProperty('opacity', isHovering ? '1' : '0');
  badge.style.setProperty('top', isHovering ? '-1.7rem' : '0');
};

const resetTokenIconOpacity = (parent: HTMLElement) => {
  Array.from(parent.children).forEach((child, index) => {
    if (index > 0) {
      (child.children[0] as HTMLElement).style.setProperty('opacity', '1');
    }
  });
};
