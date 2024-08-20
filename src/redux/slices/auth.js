import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  data: null,
  status: "loading",
};

export const fetchAuth = createAsyncThunk("/auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state, action) => {
      state.data = null;
      state.status = "error";
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.data = null;
      state.status = "error";
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegister.rejected]: (state, action) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
