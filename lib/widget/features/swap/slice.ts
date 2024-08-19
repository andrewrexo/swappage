import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { demoAssets, ExodusAsset } from '../../lib/exodus/asset';

interface SwapState {
  fromAsset: ExodusAsset;
  toAsset: ExodusAsset;
  pair: string;
  displayPair: string;
  fromAmount: string;
  toAmount: string;
  activeNetwork: 'solana' | 'ethereum';
  ethereumAddress: string;
  solanaAddress: string;
  fromNetwork: string;
  toNetwork: string;
  fromBalance: string;
  toBalance: string;
  rate: string;
  activeDirection: string;
  assets: ExodusAsset[] | null;
  slippage: number;
  slippageProtection: boolean;
}

const initialState: SwapState = {
  fromAsset: demoAssets[0],
  toAsset: demoAssets[1],
  ethereumAddress: '',
  fromBalance: '',
  solanaAddress: '',
  toBalance: '',
  fromAmount: '1',
  toAmount: '',
  activeNetwork: 'solana',
  fromNetwork: 'solana',
  toNetwork: 'ethereum',
  rate: '',
  pair: `${demoAssets[0].id}_${demoAssets[1].id}`,
  displayPair: `${demoAssets[0].symbol}_${demoAssets[1].symbol}`,
  activeDirection: 'from',
  assets: null,
  slippage: 1,
  slippageProtection: true,
};

export const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setFromAsset: (state, action: PayloadAction<ExodusAsset>) => {
      state.fromAsset = action.payload;

      if (state.toAsset) {
        state.pair = `${action.payload.id}_${state.toAsset.id}`;
        state.displayPair = `${action.payload.symbol}/${state.toAsset.symbol}`;
      }
    },
    setToAsset: (state, action: PayloadAction<ExodusAsset>) => {
      state.toAsset = action.payload;

      if (state.fromAsset) {
        state.pair = `${state.fromAsset.id}_${action.payload.id}`;
        state.displayPair = `${state.fromAsset.symbol}/${action.payload.symbol}`;
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
    setSlippage: (state, action: PayloadAction<number>) => {
      state.slippage = action.payload;
    },
    setSlippageProtection: (state, action: PayloadAction<boolean>) => {
      state.slippageProtection = action.payload;
    },
    setEthereumAddress: (state, action: PayloadAction<string>) => {
      state.ethereumAddress = action.payload;
      state.fromNetwork = 'ethereum';
      state.activeNetwork = 'ethereum';
    },
    setFromBalance: (state, action: PayloadAction<string>) => {
      state.fromBalance = action.payload;
    },
    setSolanaAddress: (state, action: PayloadAction<string>) => {
      state.solanaAddress = action.payload;
      state.fromNetwork = 'solana';
      state.activeNetwork = 'solana';
    },
    setToBalance: (state, action: PayloadAction<string>) => {
      state.toBalance = action.payload;
    },
    setFromNetwork: (state, action: PayloadAction<string>) => {
      state.fromNetwork = action.payload;
    },
    setToNetwork: (state, action: PayloadAction<string>) => {
      state.toNetwork = action.payload;
    },
    setActiveNetwork: (state, action: PayloadAction<'solana' | 'ethereum'>) => {
      state.activeNetwork = action.payload;
    },
  },
});

export const {
  setFromAsset,
  setToAsset,
  setFromAmount,
  setToAmount,
  setFromNetwork,
  setToNetwork,
  setRate,
  setActiveDirection,
  setSlippage,
  setSlippageProtection,
  setEthereumAddress,
  setFromBalance,
  setSolanaAddress,
  setToBalance,
  setActiveNetwork,
} = swapSlice.actions;

export default swapSlice.reducer;
