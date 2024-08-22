import { useCallback, useMemo, useState } from 'react';
import { Flex, Progress, TextField } from '@radix-ui/themes';
import type { ChangeEvent, ReactNode } from 'react';
import { AssetList } from './asset-list';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  fetchAssets,
  paginateAssets,
  setSearchQuery,
} from '../../features/assets/slice';
import { debounce } from 'lodash';
import { MagnifyingGlassIcon, ReloadIcon } from '@radix-ui/react-icons';
import { ResponsiveDialogDrawer } from '../ui/dialog-drawer';
import {
  ExodusAsset,
  SUPPORTED_NETWORKS,
  SupportedNetwork,
} from '../../lib/exodus/asset';
import { HoverEffect } from '../ui/card-hover-effect';
import { motion } from 'framer-motion';

const MotionProgress = motion(Progress);

const supportedNetworks = ['ETH', 'solana', 'arbitrum-one', 'base'];
const supportedNetworksToStandard = {
  ETH: 'ethereum',
  solana: 'solana',
  'arbitrum-one': 'ethereumarbone',
  base: 'basemainnet',
} as const;

const AssetSearchHeader = ({
  handleSearch,
  handleNetworkBadgeClick,
}: {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNetworkBadgeClick: (network?: string) => void;
}) => {
  return (
    <Flex direction="column" gap="2" className="h-full pt-4">
      <Flex className="w-full" justify="between" align="center">
        Assets
        <Flex gap="3" align="center">
          <ReloadIcon
            width="24"
            height="24"
            className="flex cursor-pointer transition-all duration-300"
            onClick={() => {
              handleNetworkBadgeClick();
            }}
          />
          <HoverEffect
            networks={supportedNetworks}
            onNetworkBadgeClick={handleNetworkBadgeClick}
          />
        </Flex>
      </Flex>
      <TextField.Root
        className="h-18 px-2 sm:h-12 sm:bg-inherit"
        onChange={handleSearch}
        size="3"
        variant="surface"
        style={{
          marginLeft: '1px',
          marginRight: '1px',
          marginTop: '1px',
        }}
        placeholder="ShibaNutsackInu"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon
            className="text-[var(--gray-9)]"
            height="24"
            width="24"
          />
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
};

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
  const { assets, searchAssets, status, error, page, networks, searchQuery } =
    useAppSelector((state) => state.assets);

  const handleLoadMore = () => {
    dispatch(paginateAssets());
    dispatch(fetchAssets({ networks, page: page + 1 }));
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(setSearchQuery(value));
      dispatch(fetchAssets({ networks, page: 1, query: value }));
    }, 300),

    [dispatch, assets],
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleNetworkBadgeClick = (network?: string) => {
    if (!network) {
      dispatch(setSearchQuery(''));
      dispatch(
        fetchAssets({
          networks: [...SUPPORTED_NETWORKS] as SupportedNetwork[],
          page: 1,
          ...(searchQuery && { query: searchQuery }),
        }),
      );
      return;
    }

    const standardNetwork =
      supportedNetworksToStandard[
        network as keyof typeof supportedNetworksToStandard
      ];

    dispatch(
      fetchAssets({
        networks: [standardNetwork],
        page: 1,
        ...(searchQuery && { query: searchQuery }),
      }),
    );
  };

  return (
    <ResponsiveDialogDrawer
      trigger={children}
      setOpen={setOpen}
      open={open}
      title={
        <AssetSearchHeader
          handleSearch={handleSearch}
          handleNetworkBadgeClick={handleNetworkBadgeClick}
        />
      }
    >
      <Flex direction="column" className="h-full sm:max-h-[50vh]">
        {(status === 'succeeded' ||
          (status === 'loading' && assets.length > 0)) && (
          <AssetList
            assets={searchAssets.length > 0 ? searchAssets : assets}
            onAssetSelect={onAssetSelect}
            onLoadMore={handleLoadMore}
          />
        )}
        {status === 'loading' && (
          <MotionProgress
            className="mb-2 h-2 max-h-2"
            size="3"
            transition={{
              duration: 0.1,
            }}
            animate={{
              opacity: 1,
            }}
            style={{
              marginLeft: '1px',
              marginRight: '1px',
              marginTop: '1px',
            }}
          />
        )}
        {status === 'failed' && <p className="pt-2">Error: {error}</p>}
      </Flex>
    </ResponsiveDialogDrawer>
  );
}
