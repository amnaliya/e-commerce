// import { useContext } from "react";
// import { Cartcontext } from "../context/cartcontext";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addtocart,increasing,decreasing,removing,setcart } from "../redux/cartslice";
import { useEffect } from "react";
import { getcart ,updatecart,deleting} from "../services/cartservices";


function Cart(){
 const navigate=useNavigate();
 const cart=useSelector((state)=>state.cart.items)
 const userid=useSelector((state)=>state.auth.userid)
 const dispatch=useDispatch();
 
 const fetchcart = async () => {
        const data = await getcart(userid);
        dispatch(setcart(data));
    };

    useEffect(()=>{
      if(userid){
        fetchcart()
      }
 },[userid,dispatch])

  const total=cart.reduce((total,product)=>{
    return total + product.price * product.quantity
 },0)
  

 return (
    <>
    <div className="min-h-screen bg-[#f7f3eb] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
    <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold font-serif text-[#4A2C22] sm:mb-8 sm:text-4xl mb-6 text-center ">Your Cart</h1>

        {cart.length===0 ? (
            <div className="rounded-xl bg-white sm:p-10 p-8 text-center shadow-sm">
            <p className="sm:text-xl  text-lg text-gray-500">Your Cart Is Empty</p>
            </div>):(
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1fr_380px] lg:gap-10">
                <div className="space-y-4 sm:space-y-6 ">
                {cart.map((value)=>(
                    <div key={value.id}
                    className="flex items-center p-5 gap-3 rounded shadow-sm bg-white sm:gap-5 sm:p-5">
                        <img src={value.image} className="h-28 w-24 shrink-0 rounded-lg object-cover sm:h-40 sm:w-32" />

                        <div className="flex-1 min-w-0">
                        <h2 className="text-[#4A2C22] text-base sm:text-2xl font-serif font-bold">{value.name}</h2>
                        <p className="text-[#1F4D3A] font-semibold text-base mt-1 sm:mt-3 sm:text-xl ">{value.price}</p>

                        <div className="flex flex-wrap  items-center gap-3 mt-3 sm:mt-4 sm:gap-3">
                            <button className="flex h-8 w-8 items-center justify-center border border-[#4A2C22] text-lg text-[#4A2C22] sm:h-9 sm:w-9" 
                            onClick={async()=>{
                          const newquantity=value.quantity -1
                          await updatecart(value.id,newquantity)
                            dispatch(decreasing(value.id))}}>-</button>
                        <p className="text-xs sm:text-base font-medium">QUANTITY:{value.quantity}</p>
                        <button className="flex h-8 w-8 items-center justify-center border border-[#4A2C22] text-lg text-[#4A2C22] sm:h-9 sm:w-9"
                         onClick={async()=>{
                          const newquantity=value.quantity +1
                          await updatecart(value.id,newquantity)
                         dispatch(increasing(value.id))}}>+</button>
                        </div>
                        <button onClick={async()=>{
                          await deleting(value.id)
                          dispatch(removing(value.id))
                        }} className="mt-3 rounded-md bg-red-500 px-3 py-1.5 text-white sm:mt-4 sm:px-4 sm:py-2 sm:text-sm">Remove from cart</button>
                    </div>
                    </div>
                ))}
                 </div>
                <div className="h-fit lg:sticky lg:top-24 rounded-xl bg-white p-5 shadow-sm">

            <h2 className="border-b mt-5 pb-4 pt-1 font-serif text-xl sm:text-2xl text-[#4A2C22]">
              Order Summary
            </h2>

            <div className="mt-5 flex justify-between sm:text-base text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="mt-5 flex justify-between text-base sm:mt-6 sm:text-lg text-lg font-semibold text-[#4A2C22]">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button onClick={()=>navigate("/checkout")} className="mt-8 w-full rounded-md bg-[#1F4D3A] px-6 py-3 text-sm font-semibold uppercase tracking-widest sm:mt-8 sm:px-6 sm:text-sm text-white transition hover:bg-[#16382B]">
              Proceed to Checkout
            </button>

          </div>

        </div>
        )}
    </div>
    </div>
    </>
 )
}

export default Cart;

