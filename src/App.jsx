import { useState } from 'react'
import Home from "./pages/home";
import Shop from "./pages/shop";
import Collection from "./pages/collections";
import Categories from "./pages/categories";
import Aboutus from "./pages/aboutus";
import Navbar from './components/navbar';
import Footer from "./components/footer";
import Register from './pages/register';
import Login from './pages/login';
import './App.css'
import { Route, Routes,BrowserRouter } from 'react-router-dom';

function App() {
  
  return (
    <>
      
        <BrowserRouter>
  <Navbar />
 <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/shop' element={<Shop />} />
  <Route path='/collections' element={<Collection />} />
  <Route path='/categories' element={<Categories />} />
  <Route path='/about' element={<Aboutus />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
 </Routes>

 <Footer />
 </BrowserRouter>
    </>
  )
}

export default App
