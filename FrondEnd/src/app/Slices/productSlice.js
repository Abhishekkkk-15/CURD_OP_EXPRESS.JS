import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  productDetails: null
};


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductt: (state, action) => {
      state.productDetails = action.payload;
    },
  }
});

export const { setProductt } = productSlice.actions;
export default productSlice.reducer;
