import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coins: [],
  status: "d",
};

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
  },
  extraReducers: {},
});

export const { setCoins } = coinsSlice.actions;

export default coinsSlice.reducer;
