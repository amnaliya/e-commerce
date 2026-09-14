import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../redux/authslice";
import { Heart, ShoppingCart, Package } from "lucide-react";

function Profile() {
  const [user, setuser] = useState(null);

  const userid = useSelector((state) => state.auth.userid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userid) {
      fetchuser();
    }
  }, [userid]);

  const fetchuser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userid}`);
      setuser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlelogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("userrole");
    dispatch(logout());
    toast.info("logged out successfully");
    navigate("/login");
  };
  return (
    <>
{/* //       <div className="min-h-screen bg-[#f7f3eb] px-5 py-12">
//         <div className="mx-auto max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
//           <h1 className="mb-8 font-serif text-3xl font-bold text-[#4A2C22]">
//             My Profile
//           </h1>

//           <div className="mb-8">
//             <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full  text-3xl text-white">
//               👤
//             </div>

//             <h2 className="font-serif text-3xl font-bold text-[#4A2C22]">
//               {user ? user.name : "Loading..."}
//             </h2>
//             <p className="mt-2 text-gray-700">
//               {" "}
//               {user ? user.email : "Loading..."}{" "}
//             </p>
//           </div>

//           <div className="flex gap-8 justify-center mb-5">
//             <button onClick={() => navigate("/wishlist")}>
//               <Heart size={24} />
//             </button>

//             <button onClick={() => navigate("/cart")}>
//               <ShoppingCart size={24} />
//             </button>

//             <button onClick={() => navigate("/orders")}>
//               <Package size={24} />
//             </button>
//           </div>

//           <button
//             onClick={handlelogout}
//             className="w-full rounded-md bg-[#4A2C22] py-3 font-semibold text-white transition hover:opacity-90"
//           >
//             Logout
//           </button>
//         </div>
//       </div> */}
  <div className="min-h-screen bg-[#f7f3eb] px-5 py-14 sm:px-8">
    <div className="mx-auto max-w-2xl">

      {/* Heading */}
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#1F4D3A]">
          YESTERA
        </p>

        <h1 className="font-serif text-4xl text-[#4A2C22] sm:text-5xl">
          My Account
        </h1>

        <div className="mx-auto mt-5 h-px w-12 bg-[#a95b3c]" />
      </div>


      {/* Profile */}
      <div className="text-center">

        {/* Initial */}
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#1F4D3A] font-serif text-3xl text-white shadow-sm">
          {user ? user.name.charAt(0).toUpperCase() : "..."}
        </div>

        <h2 className="font-serif text-3xl text-[#4A2C22]">
          {user ? user.name : "Loading..."}
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          {user ? user.email : "Loading..."}
        </p>

        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#1F4D3A]">
          YESTERA Member
        </p>

      </div>


      {/* Navigation */}
      <div className="mt-12 border-y border-stone-300">

        <button
          onClick={() => navigate("/wishlist")}
          className="group flex w-full items-center justify-between border-b border-stone-200 py-5 text-left "
        >
          <div className="flex items-center gap-4">
            <Heart
              size={20}
              strokeWidth={1.5}
              className="text-[#4A2C22]"
            />

            <div>
              <p className="text-sm font-medium text-[#4A2C22]">
                My Wishlist
              </p>

              <p className="mt-1 text-xs text-stone-500">
                Your saved treasures
              </p>
            </div>
          </div>

          <span className="text-lg text-stone-400 transition group-hover:translate-x-1">
            →
          </span>
        </button>


        <button
          onClick={() => navigate("/cart")}
          className="group flex w-full items-center justify-between border-b border-stone-200 py-5 text-left"
        >
          <div className="flex items-center gap-4">
            <ShoppingCart
              size={20}
              strokeWidth={1.5}
              className="text-[#4A2C22]"
            />

            <div>
              <p className="text-sm font-medium text-[#4A2C22]">
                Shopping Bag
              </p>

              <p className="mt-1 text-xs text-stone-500">
                Items waiting for you
              </p>
            </div>
          </div>

          <span className="text-lg text-stone-400 transition group-hover:translate-x-1">
            →
          </span>
        </button>


        <button
          onClick={() => navigate("/orders")}
          className="group flex w-full items-center justify-between py-5 text-left"
        >
          <div className="flex items-center gap-4">
            <Package
              size={20}
              strokeWidth={1.5}
              className="text-[#4A2C22]"
            />

            <div>
              <p className="text-sm font-medium text-[#4A2C22]">
                Order History
              </p>

              <p className="mt-1 text-xs text-stone-500">
                View your previous purchases
              </p>
            </div>
          </div>

          <span className="text-lg text-stone-400 transition group-hover:translate-x-1">
            →
          </span>
        </button>

      </div>

      <div className="mt-10 text-center">

        <button
          onClick={handlelogout}
           className="rounded-md bg-[#4A2C22] px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#5c4033]"
        >
          Log Out
        </button>

      </div>


      {/* Bottom branding */}
      <p className="mt-16 text-center font-serif text-sm italic text-stone-400">
        Where Every Era Tells a Story
      </p>

    </div>
  </div>

    </>
    );
}

export default Profile;

