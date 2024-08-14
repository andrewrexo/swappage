import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from '../features/assets/slice';
import swapReducer from '../features/swap/slice';
import ratesReducer from '../features/rates/slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      swap: swapReducer,
      assets: assetsReducer,
      rates: ratesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
