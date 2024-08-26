import { getIconId, networkToIcon } from '../asset-dialog/asset-option';
import { ExodusAsset } from '../../lib/exodus/asset';
import { twMerge } from 'tailwind-merge';
import { TokenIcon } from '../ui/token-icon';

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
    <TokenIcon
      key={`asset-icon-${asset.id}`}
      identifier={getIconId(asset.symbol ?? '')}
      size={size}
      className={twMerge('max-h-6 max-w-6', className)}
      fallback={networkToIcon[asset.network as keyof typeof networkToIcon]}
    />
  );
};
