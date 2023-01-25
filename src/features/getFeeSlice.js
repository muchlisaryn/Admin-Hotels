import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  fee: [],
  pending: false,
  success: false,
  error: "",
};

export const fetchFee = createAsyncThunk("fee/fetchFee", async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/cms/fee`);
    return response.data.data[0];
  } catch (e) {
    throw e;
  }
});

const feeSlice = createSlice({
  name: "fee",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFee.pending, (state) => {
        state.pending = true;
        state.success = false;
      })
      .addCase(fetchFee.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(fetchFee.fulfilled, (state, action) => {
        state.fee = action.payload;
        state.pending = false;
        state.success = true;
        state.error = "";
      });
  },
});

export default feeSlice.reducer;
