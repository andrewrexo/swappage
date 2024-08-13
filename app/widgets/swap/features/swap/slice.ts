import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { demoAssets, ExodusAsset } from '../../lib/exodus/asset';

interface SwapState {
  fromAsset: ExodusAsset;
  toAsset: ExodusAsset;
  pair: string;
  fromAmount: string;
  toAmount: string;
  rate: string;
  activeDirection: string;
  assets: ExodusAsset[] | null;
}

const initialState: SwapState = {
  fromAsset: demoAssets[0],
  toAsset: demoAssets[1],
  fromAmount: '',
  toAmount: '',
  rate: '',
  pair: '',
  activeDirection: 'from',
  assets: null,
};

export const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setFromAsset: (state, action: PayloadAction<ExodusAsset>) => {
      state.fromAsset = action.payload;

      if (state.toAsset) {
        state.pair = `${action.payload.symbol}_${state.toAsset.symbol}`;
      }
    },
    setToAsset: (state, action: PayloadAction<ExodusAsset>) => {
      state.toAsset = action.payload;

      if (state.fromAsset) {
        state.pair = `${state.fromAsset.symbol}_${action.payload.symbol}`;
      }
    },
    setFromAmount: (state, action: PayloadAction<string>) => {
      state.fromAmount = action.payload;
    },
    setToAmount: (state, action: PayloadAction<string>) => {
      state.toAmount = action.payload;
    },
    setRate: (state, action: PayloadAction<string>) => {
      state.rate = action.payload;
    },
    setActiveDirection: (state, action: PayloadAction<string>) => {
      state.activeDirection = action.payload;
    },
  },
});

export const {
  setFromAsset,
  setToAsset,
  setFromAmount,
  setToAmount,
  setRate,
  setActiveDirection,
} = swapSlice.actions;

export default swapSlice.reducer;
