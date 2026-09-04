
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import {Cartcontext} from "../context/cartcontext";


function Productdetails(){
    const {addtocart}=useContext(Cartcontext);
    const[product,setproduct]=useState("");
    const {id}=useParams();

    useEffect(()=>{
        fetchproducts();
    },[id])

    const fetchproducts=async()=>{
        try{
            const response=await axios.get(`http://localhost:3000/products/${id}`)
            setproduct(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
    if(!product){
        return <h1>loading</h1>
    }
    return (
        <>
        <div className="min-h-screen bg-[#f7f3eb]  px-8 py-12">
            <div className="rounded-xl max-w-6xl bg-white shadow-sm p-8 grid grid-cols-2 gap-10 mx-auto">

        
        <div>
        <img src={product.image} className="h-[420px]  w-[500px] rounded-lg object-cover"/>
        </div>

        <div  className="self-start pt-4 flex flex-col items-start gap-6">
            <h1 className="font-bold text-sm text-2xl text-gray-500">YESTERA COLLECTION</h1>
            <h1 className=" mt-4 font-serif text-5xl text-[#4A2C22]">{product.name}</h1>
            <p className="mt-4 font-semibold text-[#1F4D3A] text-2xl">₹{product.price}</p>
            <p className="mt-6 text-gray-700 text-md text-xl">{product.description}</p>
            <button onClick={()=>addtocart(product)}
             className="bg-[#1F4D3A] rounded-lg mt-4 w-full text-white font-medium p-5">Add To Cart</button>

        </div>
        </div>
        </div>

        </>
    )
}
export default Productdetails;