import { useCallback, useState } from 'react';
import { Flex, TextField } from '@radix-ui/themes';
import type { ChangeEvent, ReactNode } from 'react';
import { AssetList } from './asset-list';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { setSearchAssets } from '../../features/assets/slice';
import { debounce } from 'lodash';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { ResponsiveDialogDrawer } from '../ui/dialog-drawer';
import { ExodusAsset } from '../../lib/exodus/asset';

export function AssetDialog({
  children,
  open,
  setOpen,
  onAssetSelect,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  onAssetSelect: (asset: ExodusAsset) => void;
}) {
  const dispatch = useAppDispatch();
  const { assets, searchAssets, status, error } = useAppSelector(
    (state) => state.assets,
  );

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

  return (
    <ResponsiveDialogDrawer
      trigger={children}
      setOpen={setOpen}
      open={open}
      title="Assets"
    >
      <Flex direction="column" gap="4" className="h-full">
        <TextField.Root
          onChange={handleSearch}
          size="3"
          variant="surface"
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            height: '3.5rem',
            borderRadius: '1rem',
            margin: '0.1rem',
          }}
          placeholder="Search all available assets..."
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="24" width="24" />
          </TextField.Slot>
        </TextField.Root>
        {status === 'loading' && <p className="pt-2">Loading assets...</p>}
        {status === 'failed' && <p className="pt-2">Error: {error}</p>}
        {status === 'succeeded' && (
          <AssetList
            assets={searchAssets.length > 0 ? searchAssets : assets}
            onAssetSelect={onAssetSelect}
          />
        )}
      </Flex>
    </ResponsiveDialogDrawer>
  );
}
