import { getIconId, networkToIcon } from '../asset-dialog/asset-option';
import { ExodusAsset } from '../../lib/exodus/asset';
import dynamic from 'next/dynamic';
import { twMerge } from 'tailwind-merge';

const DynamicTokenIcon = dynamic(() =>
  import('../ui/token-icon').then((mod) => mod.TokenIcon),
);

export const AssetIcon = ({
  asset,
  size = 24,
  className,
}: {
  asset: Partial<ExodusAsset>;
  size?: number;
  className?: string;
}) => {
  return (
    <DynamicTokenIcon
      key={`asset-icon-${asset.id}`}
      identifier={getIconId(asset.symbol ?? '')}
      size={size}
      className={twMerge('max-h-6 max-w-6', className)}
      fallback={networkToIcon[asset.network as keyof typeof networkToIcon]}
    />
  );
};
