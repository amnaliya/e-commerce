import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginuser } from "../redux/authslice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.warning("Please Fill The Fields");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/users?email=${email}`,
      );
      const user = response.data[0];
      if (!user) {
        toast.error("User Not Found");
        return;
      }
      if (user.password !== password) {
        toast.error("Incorrect Password");
        return;
      }
      localStorage.setItem("userid", user.id);
      localStorage.setItem("userrole", user.role);

      dispatch(
        loginuser({
          userid: user.id,
          userrole: user.role,
        }),
      );
      toast.success("Login Successfull!!");

      navigate("/");
    } catch (error) {
      toast.warning("Something went Wrong");
      return;
    }
  };

  return (
    <>
      <div className="min-h-screen flex px-7 justify-center bg-[#f7f3eb]">
        <div className="max-w-md w-full rounded-lg bg-white shadow-sm m-5 p-5">
          <h1 className="font-serif text-4xl font-bold text-center text-[#4A2C22] ">
            Welcome To Yesterra
          </h1>
          <p className="font-sm text-center mt-2">
            Login to Explore The Collections
          </p>

          <div className="mt-5 space-y-7">
            <form onSubmit={handlelogin}>
              <div>
                <label className="text-sm">Enter Your Email</label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="mt-2 w-full border border-stone-300 px-4 py-3 mt-3 outline-none"
                />
              </div>

              <div>
                <label>Enter Your Password</label>
                <input
                  className="mt-2 w-full border border-stone-300 px-4 py-3 outline-none"
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>

              <button className=" rounded -lg text-white w-full bg-[#1F4D3A] mt-6 p-3">
                LOGIN
              </button>
            </form>
            <div className="border-t border-stone-200 pt-6">
              <div className="rounded-lg bg-[#f7f3eb] p-5 text-center">
                <p className="text-sm text-2xl text-brown-600 ">
                  Don't Have An Account
                </p>
                <button
                  className="mt-3 rounded-lg text-white w-full bg-[#1F4D3A] p-3"
                  onClick={() => navigate("/register")}
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
