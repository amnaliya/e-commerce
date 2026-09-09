import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

function Ordersuccess(){
  const navigate=useNavigate();

  return (
    <>
    <div className="min-h-screen flex  bg-[#f7f3eb] justify-center items-center text-center px-4 py-8 sm:px-6">
        <div className="rounded-xl bg-white shadow-md p-6 sm:p-10">
            <div className="mt-2 flex sm:mt-3 justify-center">
                <CheckCircle2 size={64} className="text-green-600 sm:h-16 sm:w-16"

                />
            </div>
            <h1 className="sm:text-3xl text-2xl font-bold text-[#5c4033] font-serif mt-5">Order Placed Succesfully</h1>
            <p className="text-xl font-base text-gray-600 leading-7 sm:mt-7 sm:text-xl sm:leading-8 mt-5">Thank you for shopping with Yesterra.<br />
          Your order has been placed successfully.</p>

          <div className="grid grid-col-1 sm:mt-8 mt-7 gap-3">
          <button className="rounded-md bg-[#5c4033] px-7 mt-8 py-3 sm:text-base font-semibold text-white transition hover:bg-[#8b6f47]"
           onClick={()=>navigate("/shop")}>Continue Shopping</button>
            <button className="rounded-md bg-[#5c4033] px-7 mt-6 py-3 sm:text-base font-semibold text-white transition hover:bg-[#8b6f47]"
           onClick={()=>navigate("/orders")}>View Order Summary</button>
           </div>
        </div>
    </div>
    </>
  )
}

export default Ordersuccess;