import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authslice";
import { useState } from "react";

function AdminLayout() {
  const dispatch = useDispatch();
  const [menu, setmenu] = useState(false);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("userrole");
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <div className="min-h-screen bg-[#f7f3eb] flex">
        <aside
          className={`fixed left-0 top-0 h-screen w-64 bg-[#1F4D3A] z-50
  transform transition-transform duration-300
  ${menu ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0`}
        >
          <div className="flex h-full flex-col p-6 relative">
             <button
      onClick={() => setmenu(false)}
      className="md:hidden absolute top-5 right-5 text-white"
    >
      <X size={26} />
    </button>
            <div>
              <h1 className="font-serif text-3xl font-bold text-white">
                yestera
              </h1>

              <p className="text-xs text-white/60 mt-1 tracking-widest">
                ADMIN PANEL
              </p>
            </div>

            <nav className="mt-12 space-y-4">
              <Link
                to="/admindashboard"
                className="px-4 py-3 rounded-lg text-white flex items-center gap-3 hover:bg-white/10 transition"
              >
                <LayoutDashboard size={19} />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/admin/products"
                className="px-4 py-3 rounded-lg text-white flex items-center gap-3 hover:bg-white/10 transition"
              >
                <Package size={19} />
                <span>Products</span>
              </Link>

              <Link
                to="/admin/users"
                className="px-4 py-3 rounded-lg text-white flex items-center gap-3 hover:bg-white/10 transition"
              >
                <Users size={19} />
                <span>Users</span>
              </Link>

              <Link
                to="/admin/orders"
                className="px-4 py-3 rounded-lg text-white flex items-center gap-3 hover:bg-white/10 transition"
              >
                <ShoppingBag size={19} />
                <span>Orders</span>
              </Link>
            </nav>

            <button
              onClick={handlelogout}
              className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              <LogOut size={19} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

           
        <div className="ml-0 md:ml-64 flex-1 min-w-0">
          {/* <header className="h-20 bg-white border-b border-stone-200 flex items-center px-8 sticky top-0 z-50">
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-widest">
                Overview
              </p>

              <h1 className="font-serif text-2xl font-bold text-[#4A2C22]">
                Admin Dashboard
              </h1>
            </div>
          </header> */}

<div className="md:hidden h-16 bg-white border-b border-stone-200 flex items-center px-5">
  <button
    onClick={() => setmenu(!menu)}
    className="text-[#1F4D3A]"
  >
    {menu ? <X size={45} /> : <Menu size={26} />}
  </button>

  <h1 className="ml-4 font-serif text-xl font-bold text-[#4A2C22]">
    yestera
  </h1>
</div>
          <main className="p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
export default AdminLayout;
