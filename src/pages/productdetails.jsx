
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios";
import { addtocart} from "../redux/cartslice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import { addcart } from "../services/cartservices";
import { addtowishlist ,deleting} from "../services/wishlistservices";
import { addwishlist,removefromwishlist } from "../redux/wishlistslice";




function Productdetails(){
        console.log("PRODUCT DETAILS RENDERED");
    const dispatch=useDispatch();
    // const cart=useSelector((state)=>state.cart.items)
    const userid=useSelector((state)=>state.auth.userid);
    const wishlist=useSelector((state)=>state.wishlist.items)
    const navigate=useNavigate();
   
    const[product,setproduct]=useState("");
    const {id}=useParams();

    useEffect(()=>{
        console.log("FETCHING PRODUCT");

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

    const handlewishlist=async()=>{
        if(!userid){
            toast.warning("please login first")
            navigate("/login")
            return;
        }
        const existing=wishlist.find((value)=>
        value.productId===product.id)

        if(existing){
    try{
        await deleting(existing.id);
        dispatch(removefromwishlist(product.id));
        toast.info("removed from wishlist");
    }
    catch(error){
        console.log(error);
        toast.error("failed to remove from wishlist");
    }

    return;
}
        
        const wishlistitem={
            userid:userid,
            productId:product.id,
            name:product.name,
            price:product.price,
            image:product.image
        };

        try{
            const data=await addtowishlist(wishlistitem);
            dispatch(addwishlist(data))
            toast.success("added to wishlist")

        }
        catch(error){
            console.log(error);
            toast.error("failed to add to wishlist")
            
        }
    }

    const handleremove=async (id,productId)=>{
        try{
            await deleting(id);
            dispatch(removefromwishlist(productId))
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <>
        <div className="min-h-screen bg-[#f7f3eb]  px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
            <div className="rounded-xl max-w-6xl bg-white shadow-sm p-4 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8 grid grid-cols-1 gap-8 mx-auto">

        
        <div className="relative">
        <img src={product.image} className="aspect-square w-full rounded-lg object-cover"/>
        <button
        onClick={handlewishlist}
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 sm:right-4 sm:top-4 sm:h-11 sm:w-1"
    >
        <span
            className={`text-xl sm:text2xl${
                wishlist.some(
                    (item) => item.productId === product.id
                )
                    ? "text-red-500"
                    : "text-gray-500"
            }`}
        >
            ♥
        </span>
    </button>
        </div>

        <div  className="flex flex-col items-start gap-4 pt-2 sm:gap-5 sm:pt-4">
            <h1 className="font-bold  text-xs sm:text-sm text-2xl text-gray-500">YESTERA COLLECTION</h1>
            <h1 className=" mt-4 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl text-[#4A2C22]">{product.name}</h1>
            <p className="mt-4 font-semibold text-[#1F4D3A] text-xl sm:text-2xl">₹{product.price}</p>
            <p className="mt-6 text-gray-700 text-base leading-7 sm:text-lg  text-xl">{product.description}</p>
             <button onClick={async(e)=>{
                e.preventDefault()
                if(!userid){
                    toast.warning("please login first")
                    navigate("/login")
                    return;
                }

                const cartitem={
                      userid: userid,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
                };
                try{
                    const data=await addcart(cartitem)
                    console.log("CART API SUCCESS:", data);

                toast.success("Added to cart!", {
                position: "top-center",
                autoClose: 3000
            });
                     
                    //  toast.success("Added to cart!");
                      
                       dispatch(addtocart(product))
                }catch(error){
                      console.log("API ERROR:", error);
                    console.log("ERROR RESPONSE:", error.response);
                    toast.error("failed to add to cart")
                    
                }
            
           }}
             className="bg-[#1F4D3A] rounded-lg sm:p-4 sm:text-base w-full text-white font-medium p-5">Add To Cart</button>

        </div>
        </div>
        </div>

        </>
    )
}
export default Productdetails;