import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    connected: false,
    chainId: 0,
    signer: {},
  },
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connect: (state, action) => {
      state.value.connected = true;
      state.value.chainId = action.payload.chainId;
      state.value.signer = action.payload.signer;
    },
    disconnect: (state) => {
      state.value.connected = false;
      state.value.chainId = 0;
      state.value.signer = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { connect,disconnect } = walletSlice.actions;

export default walletSlice.reducer;
