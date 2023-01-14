import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import usersReducer from "./features/getUserSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
