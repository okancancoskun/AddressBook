import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAddress, ICreateAddress } from "../interfaces";
import axios from "../helpers/axios";
import {
  AsyncThunk,
  AsyncThunkConfig,
} from "@reduxjs/toolkit/dist/createAsyncThunk";

interface IState {
  addresses?: IAddress[];
  address?: IAddress | null;
  loading: "pending" | "succeeded" | "failed";
}

const initialState: IState = {
  address: null,
  addresses: [],
  loading: "pending",
};

export const getAddresses: AsyncThunk<IAddress[], void, AsyncThunkConfig> =
  createAsyncThunk("addresses/getAddresses", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/address");
      return data;
    } catch (error) {
      return rejectWithValue("No address found");
    }
  });

export const getAddress = createAsyncThunk(
  "addresses/getAddress",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/address/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue("No address found");
    }
  }
);
export const createAddress = createAsyncThunk(
  "addresses/create",
  async (dto: ICreateAddress, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/address/create", dto);
      return data;
    } catch (error) {
      return rejectWithValue("No address found");
    }
  }
);

export const updateAddress = createAsyncThunk(
  "addresses/update",
  async (
    dto: Partial<ICreateAddress> & { _id: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const id = dto?._id;
      delete dto._id;
      await axios.put(`/address/${id}`, dto);
    } catch (error) {
      return rejectWithValue("An error happened while updating address");
    }
  }
);
export const deleteAddress = createAsyncThunk(
  "addresses/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`address/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue("An error happened while deleting address");
    }
  }
);

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddresses.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAddresses.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.addresses = action.payload;
    });
    builder.addCase(getAddresses.rejected, (state, action) => {
      state.loading = "failed";
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.loading = "succeeded";
      const index = state.addresses?.findIndex((i) => i._id === action.payload);
      if (index !== undefined && index > -1) {
        state.addresses?.splice(index, 1);
      }
    });

    builder.addCase(createAddress.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });
    builder.addCase(createAddress.rejected, (state, action) => {
      state.loading = "failed";
    });

    builder.addCase(updateAddress.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.loading = "failed";
    });

    builder.addCase(getAddress.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.address = action.payload;
    });
    builder.addCase(getAddress.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

const addressReducer = addressSlice.reducer;
export default addressReducer;
