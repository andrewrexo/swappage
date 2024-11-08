import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getRateByPairIdSwappage } from '../../lib/rates';
import { PairRate } from '../../lib/exodus/rate';
import { swapApiUrl } from '@/lib/util';

interface RateState {
  rates: PairRate[];
  currentRate: PairRate | null;
  status: string;
  error: string | null;
  lastFetched: number | null;
}

const initialState: RateState = {
  rates: [],
  currentRate: null,
  status: 'idle',
  error: null,
  lastFetched: null,
};

export const fetchSlugPrice = createAsyncThunk(
  'rates/fetchSlugPrice',
  async (slugs: string[], { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${swapApiUrl}/assets/price?slugs=${slugs.join(',')}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch pricing data');
      }

      const data = await response.json();

      const fromAssetAmount = data.find(
        (price: any) => price.symbol === slugs[0],
      );

      const toAssetAmount = data.find(
        (price: any) => price.symbol === slugs[1],
      );

      if (!fromAssetAmount || !toAssetAmount) {
        // todo: handle this better
        console.warn('Failed to fetch pricing data for pair.');
      }

      return {
        fromAssetFiat: fromAssetAmount ? fromAssetAmount.price : 0,
        toAssetFiat: toAssetAmount ? toAssetAmount.price : 0,
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch slug prices');
    }
  },
);

export const fetchPairRate = createAsyncThunk(
  'rates/fetchPairRate',
  async (pairId: string, { rejectWithValue }) => {
    try {
      const [fromAsset, toAsset] = pairId.split('_');
      const [rate, prices] = await Promise.all([
        getRateByPairIdSwappage(pairId),
        fetchCMCPrice(pairId),
      ]);

      if (!rate) {
        return rejectWithValue('No rate available for this pair');
      }

      const fromAssetAmount = prices.find(
        (price: any) => price.symbol === fromAsset,
      );

      const toAssetAmount = prices.find(
        (price: any) => price.symbol === toAsset,
      );

      if (!fromAssetAmount || !toAssetAmount) {
        // todo: handle this better
        console.warn('Failed to fetch pricing data for pair.');
      }

      return {
        ...rate,
        fromAssetFiat: fromAssetAmount ? fromAssetAmount.price : 0,
        toAssetFiat: toAssetAmount ? toAssetAmount.price : 0,
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch pair rate');
    }
  },
);

const fetchCMCPrice = async (pairId: string) => {
  const [fromAsset, toAsset] = pairId.split('_');
  const response = await fetch(
    `${swapApiUrl}/assets/price?slugs=${fromAsset},${toAsset}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch pricing data');
  }

  const data = await response.json();

  if (!data || !data.length) {
    throw new Error('No pricing data found in response');
  }

  return data;
};

// Update the slice to handle the new async thunk
const rateSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setCurrentRate: (state, action: PayloadAction<PairRate>) => {
      state.currentRate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlugPrice.fulfilled, (state, action) => {
        if (state.currentRate) {
          state.currentRate = {
            ...state.currentRate,
            fromAssetFiat: action.payload.fromAssetFiat,
            toAssetFiat: action.payload.toAssetFiat,
          };
        }
      })
      .addCase(fetchPairRate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchPairRate.fulfilled,
        (state, action: PayloadAction<PairRate>) => {
          state.status = 'succeeded';
          state.currentRate = action.payload;

          const index = state.rates.findIndex(
            (rate) => rate.pairId === action.payload.pairId,
          );

          if (index !== -1) {
            state.rates[index] = action.payload;
          } else {
            state.rates.push(action.payload);
          }

          state.lastFetched = Date.now();
        },
      )
      .addCase(fetchPairRate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Unknown error occurred';
        state.currentRate = null; // Clear the current rate when fetching fails
      });
  },
});

export const { setCurrentRate } = rateSlice.actions;

export default rateSlice.reducer;
