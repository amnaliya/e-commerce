import { setwishlist,removefromwishlist } from "../redux/wishlistslice"
import { getwishlist,deleting } from "../services/wishlistservices"
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"

function wishlist(){

    const wishlist=useSelector((state)=>state.wishlist.items)
    const userid=useSelector((state)=>state.auth.userid)
    const dispatch=useDispatch();

    useEffect(()=>{
        if(userid){
            fetchwishlist()
        }
    },[userid])

    const fetchwishlist=async()=>{
        try{
            const data=await getwishlist(userid);
            dispatch(setwishlist(data))
        }catch(error){
            console.log(error)
        }
    };
       const handleremove=async (id,productId)=>{
        try{
            await deleting(id);
            dispatch(removefromwishlist(productId))
        }
        catch(error){
            console.log(error)
            
        }
    }

    return (
        <>
        <div className="min-h-screen bg-[#f7f3eb] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-center mb-8 font-bold text-[#4A2C22] font-serif text-3xl sm:text-4xl">
                    My Wishlist
                </h1>


                <div>
                {wishlist.length===0 ?(

                <div className="rounded-xl bg-white p-8 text-center shadow-sm sm:p-10">
                    <p className=" text-xl sm:text-5xl text-gray-800">Your Wishlist is Empty</p>
                </div>
                ):(
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {wishlist.map((value)=>(
                            <div key={value.id} className="overflow-hidden rounded-xl bg-white shadow-sm">

                                <img src={value.image} className="aspect-square w-full object-cover" />

                                <div className="p-4 sm:p-5">
                                <h2 className="text-[#4A2C22] font-serif text-2xl  line-clamp-2 sm:text-2xl font-bold">{value.name}</h2>
                                <p className="mt-2  text-[#1F4D3A] font-semibold text-lg">{value.price}</p>
                                <button className="mt-4 w-full rounded-md bg-red-500 px-3 py-2 font-medium text-white sm:px-4 sm:py-3 sm:text-base"
                                onClick={()=>handleremove(value.id,value.productId)}>
                                 Remove from Wishlist
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                </div>

            </div>
        </div>
        </>
    )
}

export default wishlist