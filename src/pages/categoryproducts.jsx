import { useParams ,Link} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addtocart } from "../redux/cartslice";
import { addcart } from "../services/cartservices";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addtowishlist,deleting } from "../services/wishlistservices";
import { addwishlist,removefromwishlist } from "../redux/wishlistslice";

function Categoryproducts(){
    const{category}=useParams();
    const [product,setproduct]=useState([]);
    // const cart=useSelector((state)=>state.cart.items)
    const userid=useSelector((state)=>state.auth.userid)
    const wishlist=useSelector((state)=>state.wishlist.items)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
        fetchproducts();
    },[category])

    const fetchproducts=async()=>{
        try{
            const response=await axios.get(`http://localhost:3000/products?category=${category}`)
            setproduct(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    

    const handleaddtocart=async(product)=>{
        if(!userid){
            toast.warning("please login first");
            navigate("/login");
            return;
        }
        const cart={
        userid: userid,
      productId: product.id,
      name:product.name,
      price:product.price,
      image:product.image,
      quantity: 1
        }
        try{
           const data= await addcart(cart);
            dispatch(addtocart(data));
            toast.success("product added to cart")
        }
        catch(error){
            console.log(error)
            toast.error("failed to add to cart")
        }
    }


    const handlewishlist=async(product)=>{
        if(!userid){
            toast.error("failed to add to wishlist")
            navigate("/login")
            return;
        }
     const existing=wishlist.find((value)=>value.productId === product.id)
     if(existing){
        await deleting(existing.id)
        dispatch(removefromwishlist(product.id))
        toast.info("removed from wishlist")
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
        dispatch(addwishlist(data));
        toast.success("product added to wishlist");
     }
     catch(error){
        console.log(error);
        toast.warning("failed to add to wishlist")
     }

    }
    return (
        <>
            <div className="min-h-screen px-7 py-12 bg-[#f7f3eb]">
                <h1 className="text-center font-serif mb-10 text-[#1F4D3A] font-bold text-4xl">
                    {category}</h1>

                    <div className="p-5 grid grid-cols-4 gap-6">
                        
                        {product.map((value)=>(
                            <div key={value.id}
                             className="overflow-hidden rounded-lg bg-white shadow-sm">
                                <div className="relative">
                                    <Link to={`/product/${value.id}`}>
                                    <img src={value.image} alt={value.name}
                                    className="h-72 w-full object-cover" />
                                    </Link>
                                    <button onClick={(e) => {
                                         e.preventDefault();
                                         e.stopPropagation();
                                        handlewishlist(value)}}
                                     className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110">
                                     <span className={`text-2xl ${wishlist.some((item) => item.productId === value.id)?
                                         "text-red-500": "text-gray-500" }`}> ♥
                                         </span>
                                         </button>
                                         </div>
                                {/* <img src={value.image} className="h-72 w-full object-cover" /> */}

                                <div className="px-4 pt-3">
                                    <h2 className="text-[#4A2C22] font-semibold font-serif  text-xl">
                                        {value.name}</h2>
                                        <p className="text-[#1F4D3A] pl-5 font-semibold mt-5">
                                            ₹{value.price}</p></div>
                                            
                                        <div className="px-5 pb-2 pt-2">
                                    <button className="rounded-md w-full bg-[#1F4D3A] p-3 font-medium text-white "
                                    onClick={()=>handleaddtocart(value)}>
                                        Add To Cart</button>
                                    </div>
                                 </div>
                        
                        ))}
                    </div>
            </div>
        </>
    )
}

export default Categoryproducts;