import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authslice";

function AdminLayout() {
  const dispatch = useDispatch();
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
        <aside className=" sticky left-0 w-64 min-h-screen bg-[#1F4D3A] text-white p-6 flex flex-col">
          <h1 className="font-serif text-3xl font-bold">yestera</h1>
          <p className="text-xs text-white/60 mt-1 tracking-widest">
            ADMIN PANEL
          </p>
          <nav className="mt-12 space-y-4">
            <Link
              to="/admindashboard"
              className="px-4 py-3 rounded-lg  text-white flex items-center gap-3"
            >
              <LayoutDashboard size={19} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/products"
              className="px-4 py-3 rounded-lg text-white  flex items-center gap-3"
            >
              <Package size={19} />
              <span>Products</span>
            </Link>
            <Link
              to="/admin/users"
              className="px-4 py-3 rounded-lg text-white flex items-center gap-3"
            >
              <Users size={19} />
              <span>Users</span>
            </Link>
            <Link
              to="/admin/orders"
              className="px-4 py-3 rounded-lg text-white flex items-center gap-3"
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
        </aside>

        <div className="flex-1">
          <header className="h-20 bg-white border-b border-stone-200 flex items-center px-8">
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-widest">
                Overview
              </p>

              <h1 className="font-serif text-2xl font-bold text-[#4A2C22]">
                Admin Dashboard
              </h1>
            </div>
          </header>
          <main className="p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
export default AdminLayout;
