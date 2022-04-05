import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  address: '',
  privateKey: '',
};

export const WalletSlice = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {
    signIn: (state, action) => {
      const { address, privateKey } = action.payload;
      if (address !== undefined && privateKey !== undefined) {
        state.isLogin = true;
        state.address = address;
        state.privateKey = privateKey;
      }
    },
    signOut: (state) => {
      return initialState;
    },
  },
});

export const { signIn, signOut } = WalletSlice.actions;
export const WalletReducer = WalletSlice.reducer;
export const selectWallet = (state) => state.wallet;
export default WalletReducer;
