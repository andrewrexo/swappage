import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAvailableAssets, {
  ExodusAsset,
  SupportedNetwork,
} from '../../lib/exodus/asset';

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
  if (networks.length === 0) {
    return rejectWithValue('No valid networks provided');
  }

  try {
    const assets = await getAvailableAssets(networks);

    if (!Array.isArray(assets)) {
      throw new Error('Received an invalid list of assets');
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
