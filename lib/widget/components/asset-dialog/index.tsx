import { useCallback, useState } from 'react';
import { TextField } from '@radix-ui/themes';
import type { ChangeEvent, ReactNode } from 'react';
import { AssetList } from './asset-list';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { setSearchAssets } from '../../features/assets/slice';
import { debounce } from 'lodash';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { ResponsiveDialogDrawer } from '../ui/dialog-drawer';
import { setFromAsset, setToAsset } from '../../features/swap/slice';
import { ExodusAsset } from '../../lib/exodus/asset';

export function AssetDialog({
  children,
  side,
}: {
  children: ReactNode;
  side: 'from' | 'to';
}) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { assets, searchAssets, status, error } = useAppSelector(
    (state) => state.assets,
  );

  const { activeDirection } = useAppSelector((state) => state.swap);

  const handleAssetSelect = (asset: ExodusAsset) => {
    if (activeDirection === 'from') {
      dispatch(setFromAsset(asset));
    } else {
      dispatch(setToAsset(asset));
    }

    setOpen(false);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const filteredAssets = assets.filter((asset) =>
        asset.name.toLowerCase().includes(value.toLowerCase()),
      );

      dispatch(setSearchAssets(filteredAssets));
    }, 300),
    [dispatch, assets],
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const dialogContent = (
    <>
      <TextField.Root
        onChange={handleSearch}
        size="3"
        placeholder="Search all available assets..."
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="18" width="18" />
        </TextField.Slot>
      </TextField.Root>
      {status === 'loading' && <p className="pt-2">Loading assets...</p>}
      {status === 'failed' && <p className="pt-2">Error: {error}</p>}
      {status === 'succeeded' && (
        <AssetList
          assets={searchAssets.length > 0 ? searchAssets : assets}
          setOpen={setOpen}
          handleAssetSelect={handleAssetSelect}
        />
      )}
    </>
  );

  return (
    <ResponsiveDialogDrawer
      trigger={children}
      setOpen={setOpen}
      open={open}
      height="80vh"
      title="Available assets"
    >
      {dialogContent}
    </ResponsiveDialogDrawer>
  );
}
