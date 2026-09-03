import camera from "../assets/vintagecamera.png"

function Featuredpicks(){
return (
    <>
    <div className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">

            <div className="mb-10 text-center">
                <h3 className="font-serif text-4xl font-bold mt-3 text-[#1F4D3A]">
                Featured Collections</h3>
            </div>

            <div className="overflow-hidden rounded-lg border border-stone-200 bg-[#f7f3eb] shadow-sm">
                <div className="h-[200px] w-full mt-5 ml-5">
                   <img src={camera} className="h-full  object-cover" />
                </div>
                 <div className="p-4">
                <p className="text-sm "> Cameras</p>
                
                <h4 className="text-[#4A2C22] text-lg  font-semibold mt2 font-serif">
                    Vintage Camera
                </h4>
                <p className="mt-2 text-stone-800 font-medium "> ₹2,500</p>
            </div></div>

   


        </div>
    </div>

    </>
)
}
export default Featuredpicks