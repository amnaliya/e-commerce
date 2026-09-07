import { createSlice } from "@reduxjs/toolkit";

const wishlistslice=createSlice({
    name:"wishlist",
    initialState:{
        items:[]
    },
    reducers:{
        setwishlist:(state,action)=>{
            state.items=action.payload
        },
        addwishlist:(state,action)=>{
            const existing=state.items.find((value)=>
            value.productId===action.payload.productId);
            if(!existing){
                state.items.push(action.payload)
            }
        },
        removefromwishlist:(state,action)=>{
            state.items=state.items.filter((value)=>
                value.productId !== action.payload)
        }
    }
})

export const{setwishlist,addwishlist,removefromwishlist}=wishlistslice.actions;
export default wishlistslice.reducer;