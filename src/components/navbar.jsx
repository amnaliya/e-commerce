import { Heart, Search, ShoppingCart, User,Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate,useSearchParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../redux/authslice";
import { useState } from "react";

function Navbar(){
    
    const [searchParams]=useSearchParams()
    const[search,setsearch]=useState( searchParams.get("search") || "")
    const navigation=useNavigate();
    const userid=useSelector((state)=>state.auth.userid);
    const role=useSelector((state)=>state.auth.role);
    const dispatch=useDispatch();

    function handlelogout(){
        localStorage.removeItem("userid")
        localStorage.removeItem("userrole");
        dispatch(logout());
        navigation("/login");
    }

    return (
        <>
        <nav className="border-b border-stone-200 bg-[#f7f3eb]">
            <div className="flex items-center justify-between mx-auto py-2 px-4 max-w-7xl">
            <Link to='/' className="flex flex-col">
            <h1 className="text-3xl font-bold text-[#1F4D3A] font-serif">YESTERA</h1>
             <p className="mt-1 text-xs text-[#1F4D3A]">
            Where Every Era Tells a Story
            </p>
            </Link>
            
<div className="flex items-center gap-6 text-sm font-medium text-stone-700">
    <Link to="/" className="transition hover:text-[#a95b3c]">HOME</Link>
    <Link to="/shop" className="transition hover:text-[#a95b3c]">SHOP</Link>
    <Link to="/categories" className="transition hover:text-[#a95b3c]">CATEGORIES</Link>
    <Link to="/about" className="transition hover:text-[#a95b3c]">ABOUT US</Link>

</div>
<div className="flex items-center justify-between gap-5 text-[#292820]">

            <div className="relative">
            <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)} placeholder="Search products..."
        className="w-52 rounded-full border border-stone-300 bg-white py-2 pl-4 pr-10 text-sm outline-none focus:border-[#1F4D3A]"/>
    <Search
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500"
        onClick={()=>navigation(`/shop?search=${search}`)}
    />
</div>

            <button onClick={()=>navigation("/wishlist")}>
                <Heart size={21} />
            </button>

            <button onClick={()=>navigation("/cart")}>
                <ShoppingCart size={21} />
            </button>

            <button onClick={()=>navigation("/orders")}>
                <Package size={21} />
            </button>

             <button onClick={()=>{
                if(userid){
                    navigation("/profile")
                }else{
                navigation("/login")
                }}}>
                <User size={21} />
            </button>
             {userid && (
        <button
            onClick={handlelogout}
            className="text-sm font-medium hover:text-[#a95b3c]"
        >
            LOGOUT
        </button>
    )}

          </div>

</div>
        </nav>
        </>
    )
}

export default Navbar;