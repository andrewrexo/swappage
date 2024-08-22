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
  error: null,
  networks: [...SUPPORTED_NETWORKS] as SupportedNetwork[],
};

export const fetchAssets = createAsyncThunk<
  { assets: ExodusAsset[]; networks: SupportedNetwork[] },
  { networks: SupportedNetwork[]; page: number; query?: string },
  { rejectValue: string }
>(
  'assets/fetchAssets',
  async ({ networks, page = 1, query = '' }, { rejectWithValue }) => {
    if (networks.length === 0) {
      return rejectWithValue('No valid networks provided');
    }

    try {
      let url = `/api/assets?networks=${networks.join(',')}`;

      if (query) {
        url += `&query=${query}`;
      }

      if (page > 1) {
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

      return { assets, networks };
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

export const { setSearchAssets, paginateAssets, setSearchQuery } =
  assetSlice.actions;

export default assetSlice.reducer;
