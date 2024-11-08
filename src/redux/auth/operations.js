import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  taskProApi,
  setAuthHeader,
  clearAuthHeader,
} from "../../config/taskProApi";
import { toast } from "react-toastify";

// POST /auth/register: і /auth/login Відправляє запит для реєстрації нового користувача з параметрами name, email і password і запит на вхід користувача.
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    let token = null;
    try {
      const resRegister = await taskProApi.post("/auth/register", credentials);

      if (resRegister.data.status === 201) {
        try {
          const resLogin = await taskProApi.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });
          setAuthHeader(resLogin.data.data.accessToken);

          setTimeout(() => {
            toast.success(
              `${resLogin.data.data.user.name}, welcome to TaskPro! 🚀`,
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
          }, 1000);
          token = resLogin.data.data.accessToken;
        } catch (errorLogin) {
          return thunkAPI.rejectWithValue(errorLogin.message);
        }
      }
      return { ...resRegister.data, accessToken: token };
    } catch (errorRegister) {
      setTimeout(() => {
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
      }, 1000);

      return thunkAPI.rejectWithValue(errorRegister.message);
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

      setTimeout(() => {
        toast.success(`${res.data.data.user.name}, welcome to TaskPro! 🚀`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }, 1000);

      return res.data;
    } catch (error) {
      setTimeout(() => {
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
      }, 1000);

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

// GET /user/current: Отримує дані поточного користувача.
export const userCurrent = createAsyncThunk(
  "user/current",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await taskProApi.get("/user/current");

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PATCH /user/profile: Відправляє запит для оновлення профілю користувача.
export const updateUserProfile = createAsyncThunk(
  "user/profile",
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await taskProApi.patch("user/profile", credentials);

      toast.success("User data updated.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return res.data;
    } catch (error) {
      toast.error("Error, please try again later.", {
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

// PATCH /user/theme: Відправляє запит для зміни теми користувача.
export const updateUserTheme = createAsyncThunk(
  "user/theme",
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

// POST /support/send-message: Відправляє зворотний зв'язок від користувача.
export const needHelp = createAsyncThunk(
  "support/send-message",
  async (feedback, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await taskProApi.post("/support/send-message", feedback);

      toast.success("Thank you, the support service will contact you.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return res.data;
    } catch (error) {
      toast.error("Sorry, error, please try again later.", {
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
