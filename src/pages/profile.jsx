import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../redux/authslice";
import { Heart, ShoppingCart, Package} from "lucide-react"

function Profile(){
    const[user,setuser]=useState(null);

    const userid=useSelector((state)=>state.auth.userid);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
        if(userid){
            fetchuser();
        }
    },[userid])

    const fetchuser=async()=>{
        try{
            const response=await axios.get(`http://localhost:3000/users/${userid}`)
            setuser(response.data)
        }
        catch(error){
            console.log(error);
        }
    }

    const handlelogout=()=>{
        localStorage.removeItem("userid");
        localStorage.removeItem("userrole");
        dispatch(logout);
        toast.info("logged out successfully");
        navigate("/login")
    }
    return (
        <>
            <div className="min-h-screen bg-[#f7f3eb] px-5 py-12">
            <div className="mx-auto max-w-md rounded-xl bg-white p-8 text-center shadow-sm">

                <h1 className="mb-8 font-serif text-3xl font-bold text-[#4A2C22]">
                    My Profile
                </h1>

                <div className="mb-8">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full  text-3xl text-white">
                        👤
                    </div>

                    <h2 className="font-serif text-3xl font-bold text-[#4A2C22]">
                        {user ?user.name  : "Loading..."}
                    </h2>
                    <p className="mt-2 text-gray-700"> {user ? user.email : "Loading..."} </p>
                </div>

                <div className="flex gap-8 justify-center mb-5">
                    <button onClick={()=>navigate("/wishlist")}>
                        <Heart size={24} />
                    </button>

                    <button onClick={()=>navigate("/cart")}>
                        <ShoppingCart size={24} />
                    </button>

                    <button onClick={()=>navigate("/orders")}>
                        <Package size={24} />
                    </button>
                </div>

                <button
                    onClick={handlelogout}
                    className="w-full rounded-md bg-[#4A2C22] py-3 font-semibold text-white transition hover:opacity-90"
                >
                    Logout
                </button>

            </div>
        </div>


        </>
    )
}

export default Profile;