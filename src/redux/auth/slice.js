import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logOut,
  userCurrent,
  updateUserProfile,
  updateUserTheme,
  needHelp,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    avatar: null,
    theme: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        const { name, email, accessToken } = action.payload;
        state.user = { name, email, avatar: null, theme: "light" };
        state.isLoggedIn = true;
        state.token = accessToken;

        state.isRefreshing = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const { name, email, avatar, theme, accessToken } = action.payload.data;
        state.user = { name, email, avatar, theme };

        state.token = accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(userCurrent.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(userCurrent.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const { name, email, avatar, theme } = action.payload;
        state.user = { name, email, avatar, theme };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(updateUserTheme.fulfilled, (state, action) => {
        state.user.theme = action.payload.date.theme;

        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(needHelp.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(userCurrent.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
