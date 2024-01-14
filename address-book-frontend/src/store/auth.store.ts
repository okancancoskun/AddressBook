import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserLogin } from "../interfaces";
import axios from "../helpers/axios";
import {
  AsyncThunk,
  AsyncThunkConfig,
} from "@reduxjs/toolkit/dist/createAsyncThunk";

interface IState {
  user: IUser | null;
  loading: "pending" | "succeeded" | "failed" | null;
}

const initialState: IState = {
  user: null,
  loading: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (dto: IUserLogin, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`auth/login`, dto);
      return data;
    } catch (error) {
      return rejectWithValue("Error while login");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = {
        ...action.payload.user,
        access_token: action.payload.access_token,
      };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
export default authReducer;
