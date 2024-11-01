import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginSt: false,
  userInfo:null
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.loginSt = action.payload;
    },
    setUserInfo:(state, action) =>{
      state.userInfo = action.payload;
    }
  }
});

export const { setUserStatus,setUserInfo } = loginSlice.actions;

export default loginSlice.reducer;  // This line is correct
