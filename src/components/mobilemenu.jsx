import { Heart, Search, ShoppingCart, User, Package, X } from "lucide-react";
import { Link } from "react-router-dom";

function MobileMenu({
  search,
  setsearch,
  clearsearch,
  handlesearch,
  userid,
  handlelogout,
  closeMenu,
}) {
  return (
    <div className="border-t border-stone-200 px-4 pb-5 pt-4 lg:hidden">
      {/* Search */}
      <div className="relative mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlesearch();
            }
          }}
          placeholder="Search products..."
          className="w-full rounded-full border border-stone-300 bg-white py-2 pl-4 pr-16 text-sm outline-none focus:border-[#1F4D3A]"
        />

        {search && (
          <button
            onClick={clearsearch}
            className="absolute right-9 top-1/2 -translate-y-1/2 text-lg text-stone-500"
          >
            ×
          </button>
        )}

        <Search
          size={18}
          onClick={handlesearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-stone-500"
        />
      </div>

      {/* Navigation links */}
      <div className="flex flex-col gap-4 text-sm font-medium text-stone-700">
        <Link to="/" onClick={closeMenu}>
          HOME
        </Link>

        <Link to="/shop" onClick={closeMenu}>
          SHOP
        </Link>

        <Link to="/categories" onClick={closeMenu}>
          CATEGORIES
        </Link>

        <Link to="/about" onClick={closeMenu}>
          ABOUT US
        </Link>

        <Link
          to="/orders"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <Package size={18} />
          ORDERS
        </Link>

        {userid && (
          <button onClick={handlelogout} className="text-left">
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
