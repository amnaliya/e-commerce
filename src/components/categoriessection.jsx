import cameracover from "../assets/camera cover page.png"
import vinylrecord from "../assets/vinyl record cover.jpg"
import retroposter from "../assets/posters.png"
import accessories from "../assets/accessories cover.png"
import collectibles from "../assets/collectibles cover.png"



function Categorysection(){
    return (
        <>
        <div className="px-7 py-16 bg-[#f7f3eb]">
            <div className="mx-auto max-w-7xl">


                <div className="mb-10 text-center">
                <p className="text-sm tracking-widest text-[#1F4D3A]">
                EXPLORE YESTERRA
                </p>
                <h2 className="font-serif  text-[#1F4D3A] mt-2 font-bold text-4xl ">
                Shop By Category</h2>
                </div>


        <div className="grid grid-cols-5 gap-6 ">

            <div className="rounded-lg bg-white text-center p-3 shadow-sm">
            <div className="text-4xl">
                <img src={cameracover}  className="object-cover h-full" alt="vintage camera cover page" />
            </div>
            <h3 className="mt-4  text-[#4A2C22] font-serif text-lg font-semibold">
            Vintage Camera
            </h3>
            </div>

              <div className="rounded-lg bg-white text-center p-3 shadow-sm">
            <div className="text-4xl">
                <img src={vinylrecord}className="h-full object-cover"  alt="vinyl records" />
            </div>
            <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
            Vinyl Records
            </h3>
            </div>

              <div className="rounded-lg bg-white text-center p-3 shadow-sm">
            <div className="text-4xl">
                <img src={retroposter} className="object-cover h-full" alt="retro posters" />
            </div>
            <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
            Retro Posters
            </h3>
            </div>

              <div className="rounded-lg bg-white text-center p-3 shadow-sm">
            <div className="text-4xl">
                <img src={accessories} className="object-cover h-full" alt="accessories" />
            </div>
            <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
            Accessories
            </h3>
            </div>

            <div className="rounded-lg bg-white text-center p-3 shadow-sm">
            <div className="text-4xl">
                <img src={collectibles} className="object-cover h-full" alt="retro posters" />
            </div>
            <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
            Collectibles
            </h3>
            </div>


        </div>

            </div>
        </div>
        </>
    )
}

export default Categorysection;