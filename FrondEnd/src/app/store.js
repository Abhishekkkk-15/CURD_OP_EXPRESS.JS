import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,  // This is correct
  }
});
