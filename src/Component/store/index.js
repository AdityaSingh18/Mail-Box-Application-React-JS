import { createSlice,configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import mailSlice from "./mail-slice";



const store = configureStore({
    reducer: {auth:authSlice.reducer,mail:mailSlice.reducer}
})


export const authActions = authSlice.actions;
export const mailActions = mailSlice.actions;

export default store;