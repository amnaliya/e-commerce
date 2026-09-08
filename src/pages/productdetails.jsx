
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
        <div className="min-h-screen bg-[#f7f3eb]  px-8 py-12">
            <div className="rounded-xl max-w-6xl bg-white shadow-sm p-8 grid grid-cols-2 gap-10 mx-auto">

        
        <div className="relative">
        <img src={product.image} className="h-[420px]  w-[500px] rounded-lg object-cover"/>
        <button
        onClick={handlewishlist}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
    >
        <span
            className={`text-2xl ${
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

        <div  className="self-start pt-4 flex flex-col items-start gap-6">
            <h1 className="font-bold text-sm text-2xl text-gray-500">YESTERA COLLECTION</h1>
            <h1 className=" mt-4 font-serif text-5xl text-[#4A2C22]">{product.name}</h1>
            <p className="mt-4 font-semibold text-[#1F4D3A] text-2xl">₹{product.price}</p>
            <p className="mt-6 text-gray-700 text-md text-xl">{product.description}</p>
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
             className="bg-[#1F4D3A] rounded-lg mt-4 w-full text-white font-medium p-5">Add To Cart</button>

        </div>
        </div>
        </div>

        </>
    )
}
export default Productdetails;