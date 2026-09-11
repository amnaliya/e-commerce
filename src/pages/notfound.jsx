import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Notfound(){
    const navigate=useNavigate();
    return (
        <>
        <div className="min-h-screen bg-brown-600 flex items-start
         justify-center px-7 py-12">
            <div className="rounded-xl shadow-xm  mt-5 w-[500px] text-center ">
                <h1 className="text-center font-bold text-5xl font-serif  mb-2">404</h1>
                    <h1 className="text-center font-bold text-5xl font-serif p-7 ">Page Not Found</h1>
                <p className="font-semibold text-xl font-Poppins">The page you are looking for doesn't exist</p>
                <button className=" w-[150px]  bg-brown-200 bg-[#1F4D3A] rounded-md  mt-2 sm:mt-4 text-white font-medium px-2 py-2 text-xs sm:text-lg mt-7"
                 onClick={()=>navigate("/shop")}>Back to home</button>
                </div>
        </div>
        </>
    )
}
export default Notfound;