import { useState } from 'react'
import Home from "./pages/home";
import Shop from "./pages/shop";
// import Categories from "./pages/categories";
import Aboutus from "./pages/aboutus";
import Navbar from './components/navbar';
import Footer from "./components/footer";
import Register from './pages/register';
import Login from './pages/login';
import Productdetails from "./pages/productdetails"
import './App.css'
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Ordersuccess from './pages/ordersuccess';
import Protectedroute from './routes/protectedroute';
import Wishlist from './pages/wishlist'
// import Cameracategory from './pages/cameracategory'
import Categories from './pages/categories';
import Categoryproducts from './pages/categoryproducts';
import Orderhistory from './pages/orderhistory';
import Profile from './pages/profile';
import Layout from './components/layout';
import Notfound from './pages/notfound';
import Protection from './routes/protecton';

function App() {
  
  return (
    <>
      
        <BrowserRouter>
        <Routes>
          <Route element={<Protection />}>
          <Route path='*' element={<Notfound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          </Route>
           <Route element={<Layout />}>
          {/* <Navbar /> */}
 
  <Route path='/' element={<Home />} />
  <Route path='/shop' element={<Shop />} />
  <Route path='/categories' element={<Categories />} />
  <Route path='/about' element={<Aboutus />} />
  <Route path='/product/:id' element={<Productdetails />} />
  {/* <Route path='/categories/camera' element={<Cameracategory />} /> */}
  <Route path="/categories/:category" element={<Categoryproducts />} />
  <Route path='/profile' element={<Profile />} />

  <Route element={<Protectedroute />}>
  <Route path='/wishlist' element={<Wishlist />} />
  <Route path='/cart' element={<Cart />} />
  <Route path='/checkout' element={<Checkout />} />
  <Route path='/ordersuccess' element={<Ordersuccess />} />
  <Route path='/orders' element={<Orderhistory />} />
  </Route>
  </Route>
 </Routes>

 {/* <Footer /> */}
 <ToastContainer />
 </BrowserRouter>
    </>
  )
}

export default App
