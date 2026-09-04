import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Cartcontext } from "../context/cartcontext";


function Shop(){
    const{addtocart}=useContext(Cartcontext)
const[products,setproducts]=useState([])
useEffect(()=>{
    fetchproducts()
},[]);

const fetchproducts=async()=>{
    try{
    const response=await axios.get("http://localhost:3000/products")
    setproducts(response.data)
}
catch(error){
  console.log(error);
  
}
}
    return (
        <>
        <div>
            <h1>SHOP</h1>

            <div className="grid grid-cols-3 gap-6 p-8">
        {products.map((value)=>(
            <div key={value.id} className="overflow-hidden rounded-lg bg-white shadow-sm">
            <Link to={`/product/${value.id}`}  key={value.id}
            className="overflow-hidden rounded-lg bg-white shadow-sm">
                <img src={value.image} alt={value.name} className="w-full h-72 object-cover" />
                <div className="p-5">
                <h2 className="font-lg font-serif text-[#4A2C22]  ">{value.name}</h2>
                <p className="font-semibold text-[#1F4D3A] mt-2">₹{value.price}</p>
                </div>
                </Link>

                 <div className="px-5 pb-5">
                <button onClick={()=>addtocart(value)}
             className="bg-[#1F4D3A] rounded-md mt-4 w-full text-white font-medium p-3">Add To Cart</button>
             </div>
             </div>
        ))}
            </div>
        </div>
        </>
    )
}

export default Shop;