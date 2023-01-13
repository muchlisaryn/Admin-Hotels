import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  pending: false,
  success: false,
  error: "",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (API) => {
  try {
    const response = await axios.get(API);
    return response.data.data;
  } catch (e) {
    throw e;
  }
});

export const deleteUsers = createAsyncThunk("users/deleteUsers", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/cms/users/${id}`
    );
    return response;
  } catch (e) {
    throw e;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.pending = true;
        state.success = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.pending = false;
        state.success = true;
        state.error = "";
      });
  },
});

export default usersSlice.reducer;
