import { configureStore } from "@reduxjs/toolkit";
import cartslice from "../redux/cartslice"
import authslice from "../redux/authslice";
import wishlistslice from "../redux/wishlistslice"
import Productreducer from "../redux/Admin/ProductSlice"
import userslice from "../redux/Admin/Userslice"
import orderslice from "../redux/Admin/Orderslice"

 export const store=configureStore({
    reducer:{
        cart:cartslice,
        auth:authslice,
        wishlist:wishlistslice,
        products:Productreducer,
        users:userslice,
        orders:orderslice
    }
 })
