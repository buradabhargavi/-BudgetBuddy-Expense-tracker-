import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: true, token: null, user: null };

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.idToken;
      state.user = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
