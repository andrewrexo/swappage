import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getRateByPairId, { PairRate } from '../../lib/exodus/rate';

interface RateState {
  rates: PairRate[];
  currentRate: PairRate | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
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

export const fetchPairRate = createAsyncThunk(
  'rates/fetchPairRate',
  async (pairId: string, { rejectWithValue }) => {
    try {
      const rate = await getRateByPairId(pairId, '');
      return rate;
    } catch (error) {
      return rejectWithValue('Failed to fetch pair rate');
    }
  },
);

// Update the slice to handle the new async thunk
const rateSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default rateSlice.reducer;
