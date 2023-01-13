import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import usersReducer from "./features/getUserSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
