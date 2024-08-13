import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from '../features/assets/slice';
import swapReducer from '../features/swap/slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      swap: swapReducer,
      assets: assetsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
