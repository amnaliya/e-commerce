import { createSlice } from "@reduxjs/toolkit";

const authslice=createSlice({
    name:"auth",
    initialState:{
         userid: localStorage.getItem("userid"),
        role: localStorage.getItem("userrole"),
    },
    reducers:{
        loginuser:(state,action)=>{
            state.userid=action.payload.userid;
            state.role=action.payload.role
        },
        logout:(state,action)=>{
            state.userid=null;
            state.role=null
        }
    }
})

export const{loginuser,logout}=authslice.actions;
export default authslice.reducer;