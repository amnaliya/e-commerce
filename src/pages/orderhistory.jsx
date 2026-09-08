import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { getorders } from "../services/orderservices";

function Orderhistory(){
    const[orders,setorders]=useState([]);
    const userid=useSelector((state)=>state.auth.userid);

    useEffect(()=>{
        if(userid){
        fetchorders();
    }},[userid])

    const fetchorders=async()=>{
        try{
            const response=await getorders(userid);
            setorders(response);
        }
        catch(error){
            console.log(error);

        }
 }
 return (
    <>
    <div className="min-h-screen bg-[#f7f3eb] px-7 py-10">
        <h1 className="font-bold text-2xl  font-serif text-[#4A2C22] mb-10 text-center">My Orders</h1>
        {orders.length===0? (
            <div className="mx-auto max-w-4xl rounded-xl bg-white p-10 text-center shadow-sm">
                <p className="text-xl text-gray-500">You Haven't placed any orders yet </p>
                <p className="mt-2 text-sm text-gray-400"> Your orders will appear here once you place an order. </p>
            </div>
        ):(
            <div className="mx-auto max-w-5xl space-y-6">
                {orders.map((value)=>(
                    <div className="rounded-xl bg-white p-6 shadow-sm"
                    key={value.id}>
                        <div className="flex items-center justify-between border-b pb-4">
                            <div>
                                <h2 className="font-serif text-xl font-bold text-[#4A2C22]">Order <br/>Id#{value.id} </h2>
                                <p className="text-sm text-gray-800 mt-1">{value.name}</p>
                            </div>
                            <div className="text-right">
                            <p className="text-sm text-gray-800"> Order Total </p>
                            <p className="text-[#1F4D3A] font-bold">₹{value.total}</p>
                            </div>
                        </div>


                        <div className="space-y-4">
                            {value.items.map((item)=>(
                                <div className="flex items-center gap-5 border-b pb-4"
                                 key={item.id}>
                                    <img src={item.image} className="h-24 w-20 rounded-md object-cover" />
                                    <div className="flex-1">
                                        <h3 className="font-serif text-lg font-semibold text-[#4A2C22]">{item.name}</h3>
                                        <p className="mt-1 text-gray-500">Quantity:{item.quantity}</p>
                                        <p className="mt-1 font-semibold text-[#1F4D3A]">Price:{item.price}</p>
                                    </div>

                                </div>

                            ))}
                        </div>

                        <div className="mt-6 flex justify-between border-t pt-5">

                                <span className="font-serif text-xl font-bold text-[#4A2C22]">
                                    Total
                                </span>

                                <span className="text-xl font-bold text-[#1F4D3A]">
                                    ₹{value.total}
                                </span>

                            </div>

                        </div>


                    
                ))}
            </div>
        )}
    </div>
    </>
 )
}

export default Orderhistory;