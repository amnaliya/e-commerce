import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"



function Register(){
    const navigate=useNavigate()
    const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[confirm,setconfirm]=useState("")

    

    const handleregister=async(e)=>{
        e.preventDefault();
         if(name === "" || email==="" || password==="" || confirm===""){
            toast.error("PLEASE FILL ALL THE FIELDS")
            return;
        }
        if(password !== confirm){
            toast.error("Passwords do not match")
            return;
        }
       const newuser= {name,email,password};
       try{
        await axios.post("http://localhost:3000/users",newuser)
        toast.success("Account Created Successfully!")
        navigate("/login")
       }
       catch(error){
        toast.warning("something went wrong")
       }
    }
    return (
        <>
        <div className="flex justify-center bg-[#f7f3eb]   min-h-screen px-7">
            <div className="w-full max-w-md rounded-lg bg-white p-8 m-5 shadow-sm">
                <h1 className="text-center font-serif text-4xl text-[#4A2C22]">CREATE ACCOUNT</h1>
                <p className="text-sm text-center mt-5 text-stone-500" >Join YESTERRA and Discover Timeless Treasures </p>
            

            <div className="mt-5 space-y-3">
                <form onSubmit={handleregister} >
                    <div >
                        <label className="text-sm">Full Name</label>
                        <input type="text" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Enter Your Name"  className="mt-2 w-full border border-stone-300 px-4 py-3 outline-none" />
                    </div>

                    <div>
                        <label className="text-sm">Email</label>
                        <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Enter Your Email"  className="mt-2 w-full border border-stone-300 px-4 py-3 outline-none" />
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Create A Password" value={password} onChange={(e)=>setpassword(e.target.value)} className="mt-2 w-full border border-stone-300 px-4 py-3 outline-none" />
                    </div>

                    <div>
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Your Password" value={confirm} onChange={(e)=>setconfirm(e.target.value)} className="mt-2 w-full border border-stone-300 px-4 py-3 outline-none" />
                    </div>

                    <button className="w-full bg-[#1F4D3A] py-3 text-white mt-7">Create Account</button>
                </form>


                <div className="mt-6 border-t border-stone-200 pt-6">
                <div className="rounded-lg bg-[#f7f3eb] p-5 text-center">
                <p className="text-sm text-2xl text-brown-600">If You Have An Account</p>
                <button className=" mt-3 w-full bg-[#1F4D3A] py-3 text-white" onClick={()=>navigate("/login")}>LOGIN</button>
                </div>
                </div>
            </div>
            </div>
            </div>
        
        </>
    )
}
export default Register