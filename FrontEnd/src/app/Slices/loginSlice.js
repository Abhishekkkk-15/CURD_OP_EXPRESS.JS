import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logOrNot :false,
  loginSt: false,
  userInfo:null
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogOrNot:(state,action)=>{
      state.logOrNot =action.payload
    },
    setUserStatus: (state, action) => {
      state.loginSt = action.payload;
    },
    setUserInfo:(state, action) =>{
      state.userInfo = action.payload;
    }
  }
});

export const { setUserStatus,setUserInfo,setLogOrNot } = loginSlice.actions;

export default loginSlice.reducer; 
