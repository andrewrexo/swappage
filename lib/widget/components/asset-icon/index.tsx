import { getIconId, networkToIcon } from '../asset-dialog/asset-option';
import { ExodusAsset } from '../../lib/exodus/asset';
import dynamic from 'next/dynamic';

const DynamicTokenIcon = dynamic(() =>
  import('../ui/token-icon').then((mod) => mod.TokenIcon),
);

export const AssetIcon = ({ asset }: { asset: Partial<ExodusAsset> }) => {
  return (
    <DynamicTokenIcon
      key={`asset-icon-${asset.id}`}
      identifier={getIconId(asset.symbol ?? '')}
      size={24}
      className="max-h-6 max-w-6"
      fallback={networkToIcon[asset.network as keyof typeof networkToIcon]}
    />
  );
};
