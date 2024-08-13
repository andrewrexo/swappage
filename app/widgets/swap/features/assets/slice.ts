import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ExodusAsset, SupportedNetwork } from '../../lib/exodus/asset';
import { authenticationHeaders, exodusApiUrl } from '../../lib/exodus/config';

interface AssetState {
  assets: ExodusAsset[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AssetState = {
  assets: [],
  status: 'idle',
  error: null,
};

export const fetchAssets = createAsyncThunk<
  ExodusAsset[],
  SupportedNetwork[],
  { rejectValue: string }
>('assets/fetchAssets', async (networks, { rejectWithValue }) => {
  const SUPPORTED_NETWORKS = ['solana', 'ethereum', 'arbitrum', 'basemainnet'];

  const validatedNetworks = networks.filter((network) =>
    SUPPORTED_NETWORKS.includes(network),
  );

  if (validatedNetworks.length === 0) {
    return rejectWithValue('No valid networks provided');
  }

  if (validatedNetworks.length !== networks.length) {
    console.warn(
      'Some provided networks were invalid and have been filtered out',
    );
  }

  try {
    const response = await fetch(
      `${exodusApiUrl.staging}assets?networks=${validatedNetworks.join(',')}`,
      {
        headers: {
          ...authenticationHeaders,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Request to Exodus Exchange rates API failed: ${response.status}`,
      );
    }

    const assets = await response.json();

    if (!Array.isArray(assets)) {
      throw new Error('Invalid response from Exodus Exchange rates API');
    }

    return assets;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error occurred';
      });
  },
});

export default assetSlice.reducer;
