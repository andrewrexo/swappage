import { useCallback, useEffect, useState } from 'react';
import { Dialog, TextField, VisuallyHidden } from '@radix-ui/themes';
import { SearchCheckIcon } from 'lucide-react';
import type { ChangeEvent, ReactNode } from 'react';
import { AssetList } from './asset-list';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchAssets, setSearchAssets } from '../../features/assets/slice';
import { debounce } from 'lodash';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

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

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const filteredAssets = assets.filter((asset) =>
        asset.name.toLowerCase().includes(value.toLowerCase()),
      );

      dispatch(setSearchAssets(filteredAssets));
    }, 300),
    [dispatch],
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title className="text-accent">Available assets</Dialog.Title>
        <VisuallyHidden>
          <Dialog.Description>
            Search all available assets...
          </Dialog.Description>
        </VisuallyHidden>
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
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
