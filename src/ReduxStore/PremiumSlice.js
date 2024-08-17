import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isPremium: false,
};

const PremiumSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setPremium(state, action) {
      state.isPremium = action.payload;
    },
  },
});

export const { toggleDarkMode, setPremium } = PremiumSlice.actions;
export default PremiumSlice.reducer;
