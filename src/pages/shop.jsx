import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate ,useSearchParams} from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
// import { Cartcontext } from "../context/cartcontext";
import {addtocart,increasing,decreasing,removing} from "../redux/cartslice"
import { useDispatch,useSelector } from "react-redux";
import { addcart } from "../services/cartservices";
import { Heart } from "lucide-react";
import { removefromwishlist,addwishlist,setwishlist } from "../redux/wishlistslice";
import { addtowishlist,deleting,getwishlist } from "../services/wishlistservices";



function Shop(){
    const[searchParams]=useSearchParams();
    const search=searchParams.get("search") || ""
    const navigate=useNavigate();
    const cart = useSelector((state) => state.cart.items);
    const wishlist = useSelector((state) => state.wishlist.items);
    const userid=useSelector((state)=>state.auth.userid)
    const dispatch=useDispatch();
    const[products,setproducts]=useState([])
    const[pricefilter,setpricefilter]=useState("all")
    const[sorting,setsorting]=useState("all")
    

    useEffect(()=>{
    fetchproducts()},[]);

    const fetchproducts=async()=>{
    try{
    const response=await axios.get("http://localhost:3000/products")
    setproducts(response.data)
}
catch(error){
  console.log(error);
  
}}
useEffect(() => {
    if (userid) {
        fetchwishlist();
    }
}, [userid]);

const fetchwishlist = async () => {
    try {
        const data = await getwishlist(userid);
        dispatch(setwishlist(data));
    } catch (error) {
        console.log(error);
    }
};

const filtering=products.filter((value)=>{
    const matchsearch=value.name.toLowerCase().includes(search.toLowerCase());
    const matchprice=
    pricefilter==="all" ||
    (pricefilter === "under1000" && value.price < 1000) ||
    (pricefilter === "1000-1500" && value.price >= 1000 && value.price <= 1500) ||
    (pricefilter === "1500-2000" && value.price > 1500 && value.price <= 2000) ||
    (pricefilter === "above2000" && value.price > 2000);
    return matchsearch && matchprice;
})

const sorted=filtering.sort((a,b)=>{
    if(sorting==="low"){
        return a.price - b.price
    }
    if(sorting==="high"){
        return b.price - a.price
    }
    return 0;
})

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

const handlewishlist=async(product)=>{
    if(!userid){
        toast.warning("please login first");
        navigate("/login");
        return;
    }
    const existing=wishlist.find((value)=>value.productId===product.id)
    if(existing){
        try{
            await deleting(existing.id);
            dispatch(removefromwishlist(product.id))
            toast.info("removed from wishlist")
            return;
        }
        catch(error){
            console.log(error);
            toast.error("failed to remove from wishlist")
        }
    }
    const wishlistitem={
        userid:userid,
        productId:product.id,
        name:product.name,
        price:product.price,
        image:product.image
    }
    try{
        const response=await addtowishlist(wishlistitem)
        dispatch(addwishlist(response));
        toast.success("added to wishlist")
    }
    catch(error){
        console.log(error);
        toast.error("failed to add to wishlist")
    }

}
    return (
        <>
        <div className="min-h-screen bg-[#f7f3eb] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
        <p className="text-xs tracking-widest text-[#1F4D3A] sm:text-sm">
          EXPLORE OUR COLLECTION
        </p></div>
            
         <div className="mx-auto mt-3 max-w-5xl rounded-lg bg-white p-4 shadow-sm sm:p-5">

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">

            <span className="mr-2 font-serif w-full font-semibold text-[#4A2C22] sm:w-auto">
                Filter by Price:
            </span>
        <select value={sorting} onChange={(e) => setsorting(e.target.value)}
            className="rounded-md border border-[#4A2C22] px-4 py-2 pr-3 mr-2 text-sm text-[#4A2C22]">
            <option value="all">Sort by Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
        </select>

            <button
                onClick={() => setpricefilter("all")}
                className={`rounded-md px-4 py-2 text-sm transition sm:px-4 ${
                    pricefilter === "all"
                        ? "bg-[#1F4D3A] text-white"
                        : "border border-[#4A2C22] text-[#4A2C22]"}`}>
                All
            </button>

            <button
                onClick={() => setpricefilter("under1000")}
                className={`rounded-md px-4 py-2 text-sm transition sm:px-4 ${
                    pricefilter === "under1000"
                        ? "bg-[#1F4D3A] text-white"
                        : "border border-[#4A2C22] text-[#4A2C22]"
                }`} >
                Under ₹1000
            </button>

            <button
                onClick={() => setpricefilter("1000-1500")}
                className={`rounded-md px-4 py-2 text-sm transition sm:px-4 ${
                    pricefilter === "1000-1500"? "bg-[#1F4D3A] text-white"
                    : "border border-[#4A2C22] text-[#4A2C22]"
                }`}
            >
                ₹1000 - ₹1500
            </button>

            <button
                onClick={() => setpricefilter("1500-2000")}
                className={`rounded-md px-4 py-2 text-sm transition sm:px-4 ${
                    pricefilter === "1500-2000"
                        ? "bg-[#1F4D3A] text-white"
                        : "border border-[#4A2C22] text-[#4A2C22]" 
                }`}
            >
                ₹1500 - ₹2000
            </button>

            <button
                onClick={() => setpricefilter("above2000")}
                className={`rounded-md px-4 py-2 text-sm transition sm:px-4 ${
                    pricefilter === "above2000"
                        ? "bg-[#1F4D3A] text-white"
                        : "border border-[#4A2C22] text-[#4A2C22]"
                }`}
            >
                Above ₹2000
            </button>

        </div>

            </div>


        

            <div className="grid grid-cols-2 max-w-7xl gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 p-5">
        {sorted.length>0 ? (sorted.map((value)=>(
            <div key={value.id} className="overflow-hidden rounded-lg bg-white shadow-sm">
            <Link to={`/product/${value.id}`}  key={value.id}
            className="block">

                <div className="relative">
                <img src={value.image} alt={value.name} className="aspect-square w-full object-cover" />
                 <button onClick={(e) => {e.preventDefault();e.stopPropagation();
                handlewishlist(value);}}
                className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 sm:right-3 sm:top-3 sm:h-11 sm:w-11">
            <Heart size={22} className={ wishlist.some((item) => item.productId === value.id)
                        ? "fill-red-500 text-red-500": "text-black"}/>
        </button>
    </div>
                <div className="sm:p-5 p-3">
                <h2 className="sm:font-lg line-clamp-2 text-sm font-serif text-[#4A2C22]  ">{value.name}</h2>
                <p className="font-semibold text-[#1F4D3A] sm:text-base sm:mt-2">₹{value.price}</p>
                </div>
                </Link>

                 <div className="px-3 pb-3 sm:px-5 sm:pb-5">
                <button onClick={()=>handleaddcart(value)}
             className="bg-[#1F4D3A] rounded-md  mt-2 sm:mt-4 w-full text-white font-medium px-2 py-2 text-xs sm:text-lg">Add To Cart</button>
             </div>
             </div>
        ))
    ):(
         <div className="col-span-full flex min-h-[300px] flex-col items-center justify-center text-center">

            <h2 className="font-serif text-2xl font-semibold text-[#4A2C22]">
                No matches found
            </h2>

            <p className="mt-2 text-sm text-stone-500">
                Try searching for a different product.
            </p>

            <button
                onClick={() => navigate("/shop")}
                className="mt-5 rounded-md bg-[#1F4D3A] px-6 py-2 text-sm text-white transition hover:bg-[#163b2d]"
            >
                View All Products
            </button>

        </div>
    )}
            </div>
        </div>
        </>
    )
}

export default Shop;