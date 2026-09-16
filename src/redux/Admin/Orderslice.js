import { createSlice } from "@reduxjs/toolkit";

const orderslice=createSlice({
    name:"orders",
    initialState:{
        orders:[]
    },
    reducers:{
        settingorders:(state,action)=>{
            state.orders=action.payload;
        }
    }
});
export const {settingorders}=orderslice.actions;
export default orderslice.reducer;
