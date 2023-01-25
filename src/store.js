import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import usersReducer from "./features/getUserSlice";
import authReducer from "./features/authSlice";
import bookingReducer from "./features/getBookingSlice";
import feeReducer from "./features/getFeeSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    auth: authReducer,
    booking: bookingReducer,
    fee: feeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
