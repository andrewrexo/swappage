import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ExodusAsset,
  SUPPORTED_NETWORKS,
  SupportedNetwork,
} from '../../lib/exodus/asset';

interface AssetState {
  assets: ExodusAsset[];
  searchAssets: ExodusAsset[];
  page: number;
  searchQuery: string;
  loaded: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  networks: SupportedNetwork[];
}

const initialState: AssetState = {
  assets: [],
  searchAssets: [],
  searchQuery: '',
  page: 1,
  status: 'idle',
  loaded: false,
  error: null,
  networks: [...SUPPORTED_NETWORKS] as SupportedNetwork[],
};

export const fetchAssets = createAsyncThunk<
  { assets: ExodusAsset[]; networks: SupportedNetwork[]; force: boolean },
  {
    networks: SupportedNetwork[];
    page: number;
    query?: string;
    search?: boolean;
    force?: boolean;
  },
  { rejectValue: string }
>(
  'assets/fetchAssets',
  async (
    { networks, page = 1, query = '', search = false, force = false },
    { rejectWithValue },
  ) => {
    if (networks.length === 0) {
      return rejectWithValue('No valid networks provided');
    }

    try {
      let url = `/api/assets?networks=${networks.join(',')}`;

      if (query && !force) {
        url += `&query=${query}`;
      }

      if (page > 1 && !force) {
        url += `&page=${page}`;
      }

      const res = await fetch(url);
      const assets = await res.json();

      if (query != '' && assets.length == 0) {
        return rejectWithValue('Sorry, no assets found with that search.');
      }

      if (!Array.isArray(assets)) {
        throw new Error('Received an invalid list of assets');
      }

      return { assets, networks, search: search ?? false, force };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    paginateAssets: (state) => {
      state.page = state.page + 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setAssets: (state, action) => {
      state.assets = action.payload;
      state.loaded = true;
      state.status = 'succeeded';
    },
    setSearchAssets: (state, action) => {
      state.searchAssets = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        if (!state.loaded) {
          state.loaded = true;
        }

        if (action.payload.force) {
          state.page = 1;
        }

        state.status = 'succeeded';
        state.assets = action.payload.assets;
        state.networks = action.payload.networks;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error occurred';
      });
  },
});

export const {
  setPage,
  setAssets,
  setSearchAssets,
  paginateAssets,
  setSearchQuery,
} = assetSlice.actions;

export default assetSlice.reducer;
