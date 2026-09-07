import { useParams ,Link} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function Categories(){
    const{category}=useParams();
    const [product,setproduct]=useState([]);
    useEffect(()=>{
        fetchproducts();
    },[])

    const fetchproducts=async()=>{
        try{
            const response=await axios.get(`http://localhost:3000/products?category=${category}`)
            setproduct(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <div className="min-h-screen px-7 py-12 bg-[#f7f3eb]">
                <h1 className="text-center font-serif mb-10 text-[#1F4D3A] font-bold text-4xl">
                    {category}</h1>

                    <div className="p-5 grid grid-cols-3 gap-6">
                        {product.map((value)=>(
                            <Link to={`/product/${value.id}`}
                            key={value.id}
                            className="overflow-hidden rounded-lg bg-white shadow-sm">
                                <img src={value.image} className="h-72 w-full object-cover" />

                                <div>
                                    <h2 className="text-[#4A2C22] font-semibold font-serif text-xl">
                                        {value.name}</h2>
                                        <p className="text-[#1F4D3A] font-semibold mt-5">
                                            {value.price}</p>
                                </div>

                            </Link>
                        ))}
                    </div>
            </div>
        </>
    )
}

export default Categories;