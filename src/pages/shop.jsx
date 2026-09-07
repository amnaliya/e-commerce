import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate ,useSearchParams} from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
// import { Cartcontext } from "../context/cartcontext";
import {addtocart,increasing,decreasing,removing} from "../redux/cartslice"
import { useDispatch,useSelector } from "react-redux";
import { addcart } from "../services/cartservices";



function Shop(){
    // const{addtocart}=useContext(Cartcontext)
    const[searchParams]=useSearchParams();
    const search=searchParams.get("search") || ""
    const navigate=useNavigate();
    const cart = useSelector((state) => state.cart.items);
    const userid=useSelector((state)=>state.auth.userid)
    const dispatch=useDispatch();
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

const filtering=products.filter((value)=>
value.name.toLowerCase().includes(search.toLowerCase()))

const handleaddcart=async(product)=>{
  if(!userid){
    toast.warning("please login first");
    navigate("/login");
    return;
  }
  const cartitem={
    userid:userid,
      productId:product.id,
      name:product.name,
      price:product.price,
      image:product.image,
      quantity:1,

  };
  try{
    const response=await addcart(cartitem)
    dispatch(addtocart(product))
    toast.success("product added to cart")
  }catch(error){
    console.log(error);
    toast.warning("failed to add to cart")
  }
}
    return (
        <>
        <div>
            <h1>SHOP</h1>

        

            <div className="grid grid-cols-3 gap-6 p-8">
        {filtering.map((value)=>(
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
                <button onClick={()=>handleaddcart(value)}
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