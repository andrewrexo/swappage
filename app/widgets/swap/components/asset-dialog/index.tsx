import { Dialog, TextField } from '@radix-ui/themes';
import { SearchCheckIcon } from 'lucide-react';
import AssetList from './asset-list';
import type { ReactNode } from 'react';

export function AssetDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="flex flex-col gap-1">
        <Dialog.Title className="text-accent">Available assets</Dialog.Title>
        <TextField.Root size="3" placeholder="Search all available assets...">
          <TextField.Slot>
            <SearchCheckIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <AssetList />
      </Dialog.Content>
    </Dialog.Root>
  );
}
