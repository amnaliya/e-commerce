import { configureStore } from "@reduxjs/toolkit";
import cartslice from "../redux/cartslice"
import authslice from "../redux/authslice";
import wishlistslice from "../redux/wishlistslice"
import Productreducer from "../redux/Admin/ProductSlice"

 export const store=configureStore({
    reducer:{
        cart:cartslice,
        auth:authslice,
        wishlist:wishlistslice,
        products:Productreducer
    }
 })
