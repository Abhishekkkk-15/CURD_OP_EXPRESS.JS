import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginSt: false
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.loginSt = action.payload;
    }
  }
});

export const { setUserStatus } = loginSlice.actions;

export default loginSlice.reducer;  // This line is correct
