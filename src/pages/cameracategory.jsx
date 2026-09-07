import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cameracategory(){
    const[products,setproducts]=useState([])

    useEffect(()=>{
        fetchcameras();
    },[])

    const fetchcameras=async()=>{
        try{
            const response=await axios.get( "http://localhost:3000/products?category=Cameras")
            setproducts(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <>
        <div className="min-h-screen bg-[#f7f3eb] px-7 py-12">
            <h1 className="text-[#1F4D3A] mb-10 text-center text-4xl font-serif font-bold">Vintage Cameras</h1>

            <div className="grid grid-cols-3 gap-6">
                {products.map((value)=>(
                    <div className="overflow-hidden rounded-lg bg-white shadow-sm"
                     to={`/product/${value.id}`}
                     key={value.id}>
                        <img src={value.image} className="h-72 w-full object-cover" />
                        <div className="p-5">
                            <h2 className="text-[#4A2C22] text-2xl font-serif font-semibold ">{value.name}</h2>
                            <p className="text-[#1F4D3A] mt-2 font-semibold">{value.price}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
        </>
    )
}

export default Cameracategory;