import { configureStore } from '@reduxjs/toolkit';
import WalletReducer from './slices/wallet';

const store = configureStore({
  reducer: {
    wallet: WalletReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
