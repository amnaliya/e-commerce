import { createSlice } from "@reduxjs/toolkit";

const cartslice=createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    reducers:{
        addtocart:(state,action)=>{
            const existing=state.items.find((value)=>
            value.id ===action.payload.id)

            if(existing){
                existing.quantity += 1
            }
            else{
                state.items.push({
                    ...action.payload,quantity:1,
                })
            }
        },
        increasing:(state,action)=>{
            const product=state.items.find((value)=>
            value.id === action.payload);
            if(product){
                product.quantity +=1;
            }
        },
        decreasing:(state,action)=>{
            const product=state.items.find((value)=>
            value.id === action.payload);
            if(product && product.quantity>1){
                product.quantity -=1;
            }
        },
        removing:(state,action)=>{
            state.items=state.items.filter((value)=>
            value.id !== action.payload)
        },
        clearcart:(state)=>{
            state.items=[];
        },
        setcart:(state,action)=>{
            state.items = action.payload;
        }
    }
})

export const {addtocart,increasing,decreasing,removing,clearcart,setcart}=cartslice.actions;
export default cartslice.reducer;