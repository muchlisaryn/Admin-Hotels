import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  booking: [],
  pending: false,
  success: false,
  error: "",
};

export const fetchBooking = createAsyncThunk(
  "booking/fetchBooking",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/cms/booking`
      );
      return response.data.data;
    } catch (e) {
      throw e;
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBooking.pending, (state) => {
        state.pending = true;
        state.success = false;
      })
      .addCase(fetchBooking.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.booking = action.payload;
        state.pending = false;
        state.success = true;
        state.error = "";
      });
  },
});

export default bookingSlice.reducer;
