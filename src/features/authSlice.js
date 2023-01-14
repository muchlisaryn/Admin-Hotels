import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  userToken: null,
  error: "",
  success: false,
};

export const auth = createAsyncThunk(
  "auth/authUser",
  async (email, password) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/cms/auth/signin`,
        {
          email: email,
          password: password,
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeLogin: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(auth.pending, (state) => {
        state.loading = true;
        state.userToken = null;
        state.success = false;
        state.error = null;
      })
      .addCase(auth.rejected, (state, action) => {
        state.loading = false;
        state.userToken = null;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.userToken = null;
        state.success = true;
        state.error = "";
      });
  },
});

export default authSlice.reducer;
