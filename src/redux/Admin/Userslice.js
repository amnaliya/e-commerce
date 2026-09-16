import { createSlice } from "@reduxjs/toolkit";
const userslice=createSlice({
    name:"users",
    initialState:{
        users:[]
    },
    reducers:{
        settingusers:(state,action)=>{
            state.users=action.payload
        },
        toggleblock:(state,action)=>{
            state.users=state.users.map((user)=>{
                if(user.id === action.payload){
                    return{
                        ...user,
                        blocked:!user.blocked
                    }
                }
                return user;
            })
            
        }
    }
})
export const  {settingusers,toggleblock}=userslice.actions;
export default userslice.reducer