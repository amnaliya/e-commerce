import { Cartcontext } from "../context/cartcontext";
import { useContext,useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout(){
    const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[address,setadrres]=useState("")
    const[city,setcity]=useState("")
    const[pincode,setpincode]=useState("")
    const[number,setnumber]=useState("")

    const navigate=useNavigate();

const {cart,clearcart}=useContext(Cartcontext)
const total=cart.reduce((total,product)=>{
    return total + product.price * product.quantity
},0)

async function handleorder(){
    if(!name ||!email||!address ||!city ||!pincode ||!number){
    toast.warning("please fill all the fields")
    return;}

    const order={
        name,email,address,city,pincode,number,total
    };
    try{
    const response=await axios.post("http://localhost:3000/orders",
        order
    );
    console.log(response.data);
    toast.success("order placed successfully")
    navigate("/ordersuccess")
    clearcart();
}
catch(error){
    console.log(error)
    toast.error("something went wrong")
}
}


return (
    <>
    <div className="bg-[#f7f3eb] min-h-screen px-7 pt-5 pb-10">
        <h1 className="text-center font-bold text-3xl text-[#5c4033] mb-3 py-1 ">CHECK OUT </h1>

        <div className="mx-auto max-w-6xl grid gap-8 grid-cols-2">
            <div className="rounded-xl bg-white p-7 shadow-md">
            <h2 className="font-bold  text-[#5c4033] text-2xl  ">Shipping Details </h2>
            <div>
                <form className="space-y-3">
                    <div className="grid grid-cols-1 gap-3 mt-5">
                    <input type="text" placeholder="enter your name" value={name} 
                    onChange={(e)=>setname(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                    />
                        <input className="w-full rounded-md border border-gray-300 p-3"
                        type="email" placeholder="enter your email" value={email} 
                        onChange={(e)=>setemail(e.target.value)} />
                
                        <textarea className="w-full rounded-md border border-gray-300 p-3" rows={3} cols={5}
                        placeholder="enter your address" value={address} 
                        onChange={(e)=>setadrres(e.target.value)} />
                    

                        <div className="grid grid-cols-2 gap-2">
                        
                        <input className="w-full rounded-md border border-gray-300 p-3"
                        type="text" placeholder="enter your city" value={city} 
                        onChange={(e)=>setcity(e.target.value)}/>
                    
                        <input className="w-full rounded-md border border-gray-300 p-3"
                         type="number" placeholder="enter your pincode" value={pincode} 
                         onChange={(e)=>setpincode(e.target.value)}/>
                         </div>


                         <input className="w-full rounded-md border border-gray-300 p-3"
                        type="number" placeholder="enter your Phone number" value={number}
                        onChange={(e)=>setnumber(e.target.value)} />
                   
                        
                    </div>
                    
                </form>
                </div>
                </div>
            

                 <div className="h-fit rounded-xl p-7 shadow-md bg-white">
                        <h2 className="mb-2 text-2xl font-bold text-[#5c4033]">ORDER SUMMARY</h2>
                        <div className="mb-6 space-y-4">
                            {cart.map((product)=>(
                                <div className="flex flex-col gap-5 justify-between border-b pb-3"
                                key={product.id}>
                                
                                        <h3 className="text-[#5c4033] font-semibold ">{product.name}</h3>
                                        <p className="text-sm text-gray-500">Quantity:{product.quantity}</p>
                                        <p className=" text-[#5c4033] font-medium"> ₹{product.price * product.quantity}</p>
                                        </div>

                            ))}
                             </div>

                             <div className="flex items-center justify-between border-b pt-5 border-gray300">
                            <p className="font-bold text-2xl text-[#5c4033]">TOTAL:₹{total}</p>
                            </div>
                            <div className="flex justify-center  mt-7">
                        <button className="mt-7 w-full rounded-md bg-[#5c4033] py-3 font-semibold text-white"
                        onClick={handleorder}>
                            Place Order</button></div>

                        </div>
                        </div>
                        
            
        
        </div>

    
    </>
)
}
export default Checkout;