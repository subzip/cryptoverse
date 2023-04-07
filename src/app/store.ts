import { configureStore } from "@reduxjs/toolkit";
import coinsSlice from "../slices/coinsSlice";

const store = configureStore({
  reducer: {
    coins: coinsSlice,
  },
});

export default store;
