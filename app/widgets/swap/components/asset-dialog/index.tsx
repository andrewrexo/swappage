import { useEffect } from 'react';
import { Dialog, TextField, VisuallyHidden } from '@radix-ui/themes';
import { SearchCheckIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { AssetList } from './asset-list';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchAssets } from '../../features/assets/slice';

export function AssetDialog({
  children,
  side,
}: {
  children: ReactNode;
  side: 'from' | 'to';
}) {
  const dispatch = useAppDispatch();
  const { assets, status, error } = useAppSelector((state) => state.assets);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAssets(['solana', 'basemainnet']));
    }
  }, [dispatch, status]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="flex flex-col gap-1">
        <Dialog.Title className="text-accent">Available assets</Dialog.Title>
        <VisuallyHidden>
          <Dialog.Description>
            Search all available assets...
          </Dialog.Description>
        </VisuallyHidden>
        <TextField.Root size="3" placeholder="Search all available assets...">
          <TextField.Slot>
            <SearchCheckIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        {status === 'loading' && <p className="pt-2">Loading assets...</p>}
        {status === 'failed' && <p className="pt-2">Error: {error}</p>}
        {status === 'succeeded' && <AssetList assets={assets} />}
      </Dialog.Content>
    </Dialog.Root>
  );
}
