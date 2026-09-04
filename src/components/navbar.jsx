import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigation=useNavigate()
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
    <Link to="/collections" className="transition hover:text-[#a95b3c]">COLLECTIONS</Link>
    <Link to="/categories" className="transition hover:text-[#a95b3c]">CATEGORIES</Link>
    <Link to="/about" className="transition hover:text-[#a95b3c]">ABOUT US</Link>

</div>
<div className="flex items-center justify-between gap-5 text-[#292820]">

            <button>
                <Search size={21} />
            </button>

            <button>
                <Heart size={21} />
            </button>

            <button onClick={()=>navigation("/cart")}>
                <ShoppingCart size={21} />
            </button>

             <button onClick={()=>navigation("/login")}>
                <User size={21} />
            </button>

          </div>

</div>
        </nav>
        </>
    )
}

export default Navbar;