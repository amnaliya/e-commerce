import {
  Heart,
  Search,
  ShoppingCart,
  User,
  Package,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authslice";
import { useState} from "react";
import MobileMenu from "./mobilemenu";

function Navbar() {
  const [menu, setmenu] = useState(false);
  const [searchParams] = useSearchParams();
  const [search, setsearch] = useState(searchParams.get("search") || "");
  const navigation = useNavigate();
  const userid = useSelector((state) => state.auth.userid);
  const role = useSelector((state) => state.auth.role);
  const cart=useSelector((state)=>state.cart.items)
  const wishlist=useSelector((state)=>state.wishlist.items)
  const dispatch = useDispatch();

  function handlelogout() {
    localStorage.removeItem("userid");
    localStorage.removeItem("userrole");
    dispatch(logout());
    navigation("/login");
  }

  function clearsearch() {
    setsearch("");
    navigation("/shop");
  }

  function handlesearch() {
    navigation(`/shop?search=${search}`);
    setmenu(false);
  }

  return (
    <>
      <nav className="border-b border-stone-200 bg-[#f7f3eb] sticky top-0 z-50">
        <div className="flex items-center justify-between mx-auto py-2 px-4 max-w-7xl">
          <Link to="/" className="flex flex-col">
            <h1 className="text-2xl font-bold text-[#1F4D3A] font-serif sm:text-3xl">
              YESTERA
            </h1>
            <p className="mt-1 sm:text-xs text-[10px] text-[#1F4D3A]">
              Where Every Era Tells a Story
            </p>
          </Link>

          <div className="lg:flex hidden items-center gap-6 text-sm font-medium text-stone-700">
            <Link to="/" className="transition hover:text-[#a95b3c]">
              HOME
            </Link>
            <Link to="/shop" className="transition hover:text-[#a95b3c]">
              SHOP
            </Link>
            <Link to="/categories" className="transition hover:text-[#a95b3c]">
              CATEGORIES
            </Link>
            <Link to="/about" className="transition hover:text-[#a95b3c]">
              ABOUT US
            </Link>
          </div>
          <div className="lg:flex items-center hidden justify-between gap-5 text-[#292820]">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) =>{
                  const value=e.target.value
                   setsearch(value)
                   if(value.trim()===""){
                    navigation("/shop")
                   }
                   else{
                    navigation(`/shop?search=${value}`)
                   }
                }}
                placeholder="Search products..."
                className="w-52 rounded-full border border-stone-300 bg-white py-2 pl-4 pr-10 text-sm outline-none focus:border-[#1F4D3A]"
              />

              {search ? (
                <button
                  onClick={clearsearch}
                  className="absolute right-9 top-1/2 -translate-y-1/2 text-lg text-stone-500 hover:text-[#4A2C22]"
                >
                  {" "}
                  ×{" "}
                </button>
              ) : <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500"
              />}
            </div>

            <button onClick={() => navigation("/wishlist")} className="relative">
              <Heart size={21} />
               {wishlist.length > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#a95b3c] text-xs text-white">
      {wishlist.length}
    </span>
  )}
            </button>

            <button onClick={() => navigation("/cart")} className="relative">
              <ShoppingCart size={21} />
               {cart.length > 0 && (
    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#a95b3c] text-xs text-white">
      {cart.length}
    </span>
  )}
            </button>

            <button onClick={() => navigation("/orders")}>
              <Package size={21} />
            </button>

            <button
              onClick={() => {
                if (userid) {
                  navigation("/profile");
                } else {
                  navigation("/login");
                }
              }}
            >
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

          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => navigation("/wishlist")}>
              <Heart size={20} />
            </button>

            <button onClick={() => navigation("/cart")}>
              <ShoppingCart size={20} />
            </button>

            <button onClick={() => navigation(userid ? "/profile" : "/login")}>
              <User size={20} />
            </button>

            <button onClick={() => setmenu(!menu)}>
              {menu ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {menu && (
          <MobileMenu
            search={search}
            setsearch={setsearch}
            clearsearch={clearsearch}
            handlesearch={handlesearch}
            userid={userid}
            handlelogout={handlelogout}
            closeMenu={() => setMenuOpen(false)}
          />
        )}
      </nav>
    </>
  );
}

export default Navbar;
