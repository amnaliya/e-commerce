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
    <div className="min-h-screen bg-[#f7f3eb] px-5 py-10">
    <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold font-serif text-[#4A2C22] mb-5 text-center ">Your Cart</h1>

        {cart.length===0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-xl text-gray-500">Your Cart Is Empty</p>
            </div>):(
            <div className="grid gap-10 grid-cols-2">
                <div className="space-y-6 ">
                {cart.map((value)=>(
                    <div key={value.id}
                    className="flex items-center p-5 gap-6 rounded shadow-sm bg-white">
                        <img src={value.image} className="h-40 w-35 rounded-lg object-cover" />

                        <div className="flex-1">
                        <h2 className="text-[#4A2C22] text-2xl font-serif font-bold">{value.name}</h2>
                        <p className="text-[#1F4D3A] font-semibold text-xl mt-3">{value.price}</p>

                        <div className="flex items-center gap-3 mt-3">
                            <button className="flex h-9 w-9 items-center justify-center border border-[#4A2C22] text-lg text-[#4A2C22]" 
                            onClick={async()=>{
                          const newquantity=value.quantity -1
                          await updatecart(value.id,newquantity)
                            dispatch(decreasing(value.id))}}>-</button>
                        <p className="text-lg font-medium">QUANTITY:{value.quantity}</p>
                        <button className="flex h-9 w-9 items-center justify-center border border-[#4A2C22] text-lg text-[#4A2C22]"
                         onClick={async()=>{
                          const newquantity=value.quantity +1
                          await updatecart(value.id,newquantity)
                         dispatch(increasing(value.id))}}>+</button>
                        </div>
                        <button onClick={async()=>{
                          await deleting(value.id)
                          dispatch(removing(value.id))
                        }} className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white">Remove from cart</button>
                    </div>
                    </div>
                ))}
                 </div>
                <div className="h-[400px] rounded-xl bg-white p-6 shadow-sm">

            <h2 className="border-b mt-5 pb-4 font-serif text-2xl text-[#4A2C22]">
              Order Summary
            </h2>

            <div className="mt-5 flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="mt-6 flex justify-between text-lg font-semibold text-[#4A2C22]">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button onClick={()=>navigate("/checkout")} className="mt-8 w-full rounded-md bg-[#1F4D3A] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-[#16382B]">
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

