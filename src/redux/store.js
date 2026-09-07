import { configureStore } from "@reduxjs/toolkit";
import cartslice from "../redux/cartslice"
import authslice from "../redux/authslice";
import wishlistslice from "../redux/wishlistslice"

 export const store=configureStore({
    reducer:{
        cart:cartslice,
        auth:authslice,
        wishlist:wishlistslice,
    }
 })
