import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  taskProApi,
  setAuthHeader,
  clearAuthHeader,
} from "../../config/taskProApi";
import { toast } from "react-toastify";

// POST /auth/register: Відправляє запит для реєстрації нового користувача з параметрами name, email і password.
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await taskProApi.post("/auth/register", credentials);
      setAuthHeader(res.data.accessToken);
      toast.success(
        "Congratulations, your account has been successfully created! 🚀",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        }
      );
      return res.data;
    } catch (error) {
      toast.warning(
        "Email already in use. Try logging in or reset your password.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        }
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST /auth/login: Відправляє запит для входу користувача з параметрами email і password.
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await taskProApi.post("/auth/login", credentials);
      setAuthHeader(res.data.data.accessToken);
      toast.success("Welcome to TaskPro! 🚀", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      console.log();

      return res.data;
    } catch (error) {
      toast.error("Incorrect email or password. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST /auth/logout: Відправляє запит для виходу користувача.
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await taskProApi.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// GET /users/current: Отримує дані поточного користувача.
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await taskProApi.get("/auth/current");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PATCH /user/: Відправляє запит для оновлення профілю користувача.
export const updateUserProfile = createAsyncThunk(
  "auth/profile",
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await taskProApi.patch("/user", credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PATCH /user/theme: Відправляє запит для зміни теми користувача.
export const updateUserTheme = createAsyncThunk(
  "auth/theme",
  async (theme, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const payload = { theme };
      const res = await taskProApi.patch("/user/theme", payload);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST /feedback/sendFeedback: Відправляє зворотний зв'язок від користувача.
export const needHelp = createAsyncThunk(
  "auth/feedback",
  async (feedback, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await taskProApi.post("/feedback/sendFeedback", feedback);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
