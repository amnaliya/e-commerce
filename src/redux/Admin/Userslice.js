import { createSlice } from "@reduxjs/toolkit";
const userslice=createSlice({
    name:"users",
    initialState:{
        users:[]
    },
    reducers:{
        settingusers:(state,action)=>{
            state.users=action.payload
        }
    }
})
export const  {settingusers}=userslice.actions;
export default userslice.reducer