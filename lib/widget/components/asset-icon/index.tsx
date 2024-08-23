import { getIconId, networkToIcon } from '../asset-dialog/asset-option';
import { ExodusAsset } from '../../lib/exodus/asset';
import { TokenIcon } from '../ui/token-icon';

export const AssetIcon = ({ asset }: { asset: Partial<ExodusAsset> }) => {
  return (
    <TokenIcon
      identifier={getIconId(asset.symbol ?? '')}
      size={24}
      className="max-h-6 max-w-6"
      fallback={networkToIcon[asset.network as keyof typeof networkToIcon]}
    />
  );
};
