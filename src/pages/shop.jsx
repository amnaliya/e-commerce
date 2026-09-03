import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Shop(){
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
            <Link to={`/product/${value.id}`}  key={value.id}
            className="overflow-hidden rounded-lg bg-white shadow-sm">
                <img src={value.image} alt={value.name} className="w-full h-72 object-cover" />
                <div className="p-5">
                <h2 className="font-lg font-serif text-[#4A2C22]  ">{value.name}</h2>
                <p className="font-semibold text-[#1F4D3A] mt-2">₹{value.price}</p>
                </div>
                </Link>
        ))}
            </div>
        </div>
        </>
    )
}

export default Shop;