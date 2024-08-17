import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("authState")) || {
  isLoggedIn: false,
  token: null,
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.idToken;
      state.user = action.payload.email;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("authState");
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
