import { createSlice } from "@reduxjs/toolkit";


const Productreducer=createSlice({
    name:"products",
    initialState:{
        products:[]
    },
    reducers:{
        settingproduct:(state,action)=>{
            state.products=action.payload
        }
    }
})
export const{settingproduct}=Productreducer.actions;
export default Productreducer.reducer;