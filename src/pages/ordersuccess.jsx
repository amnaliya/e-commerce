import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

function Ordersuccess(){
  const navigate=useNavigate();

  return (
    <>
    <div className="min-h-screen flex flex-col bg-[#f7f3eb] justify-center items-center text-center px-5">
        <div className="rounded-xl bg-white shadow-md p-10">
            <div className="mt-3 flex flex justify-center">
                <CheckCircle2 size={64} className="text-green-600"

                />
            </div>
            <h1 className="text-3xl font-bold text-[#5c4033] font-serif mt-5">Order Placed Succesfully</h1>
            <p className="text-xl font-semibold text-gray-600  mt-7">Thank you for shopping with Yesterra.<br />
          Your order has been placed successfully.</p>
          <button className="rounded-md bg-[#5c4033] px-7 mt-12 py-3 font-semibold text-white transition hover:bg-[#8b6f47]"
           onClick={()=>navigate("/shop")}>Continue Shopping</button>
        </div>
    </div>
    </>
  )
}

export default Ordersuccess;