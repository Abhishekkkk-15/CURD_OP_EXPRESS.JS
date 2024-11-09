import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/loginSlice";
import  productSlice  from "./Slices/productSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    product: productSlice
  }
});
// console.log(store.getState()); // Check if the state is initialized correctly
