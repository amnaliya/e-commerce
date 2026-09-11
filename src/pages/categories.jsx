
import cameracover from "../assets/camera cover page.png"
import vinylrecord from "../assets/vinyl record cover.jpg"
import retroposter from "../assets/posters.png"
import accessories from "../assets/accessories cover.png"
import collectibles from "../assets/collectibles cover.png"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
function Categories(){
    return (
        <>
            <div className="px-7 py-12 min-h-screen  bg-[#f7f3eb]">
            <div className="mx-auto max-w-7xl">


                <div className="mb-10 text-center">
                <p className="text-sm tracking-widest text-[#1F4D3A]">
                EXPLORE YESTERRA
                </p>
                <h2 className="font-serif  text-[#1F4D3A] mt-2 font-bold text-4xl ">
                Categories</h2>
                </div>


        <div className="grid grid-cols-3 gap-6 ">

            <div className="rounded-lg bg-white text-center p-3 shadow-sm">
            <div className="text-4xl">
                <Link to="/categories/Cameras" className="block overflow-hidden rounded-lg ">
                <img src={cameracover}  className="object-cover h-full" alt="vintage camera cover page" /> 
                </Link>
            </div>
            <h3 className="mt-4  text-[#4A2C22] font-serif text-lg font-semibold">
            Vintage Camera
            </h3>
            <Link to="/categories/Cameras"
            className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group">
            Explore Collection
        <ArrowRight size={17}
        className="transition-transform duration-300 group-hover:translate-x-1"/>
        </Link>
            </div>

              <div className="rounded-lg bg-white text-center p-3 shadow-sm">
            <div className="text-4xl">
                <Link to="/categories/Vinyl Records" className="block overflow-hidden rounded-lg">
                <img src={vinylrecord}className="h-full object-cover"  alt="vinyl records" />
                </Link>
            </div>
            <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
            Vinyl Records
            </h3>
             <Link to="/categories/Cameras"
            className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group">
            Explore Collection
        <ArrowRight size={17}
        className="transition-transform duration-300 group-hover:translate-x-1"/>
        </Link>
            </div>

              <div className="rounded-lg bg-white text-center p-3 shadow-sm">
            <div className="text-4xl">
                <Link to="/categories/Retro Poster" className="block overflow-hidden rounded-lg">
                <img src={retroposter} className="object-cover h-full" alt="retro posters" />
                </Link>
            </div>
            <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
            Retro Posters
            </h3>
             <Link to="/categories/Cameras"
            className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group">
            Explore Collection
        <ArrowRight size={17}
        className="transition-transform duration-300 group-hover:translate-x-1"/>
        </Link>
            </div>

              <div className="rounded-lg bg-white text-center p-3 shadow-sm">
            <div className="text-4xl">
                <Link to="/categories/Accessories" className="block overflow-hidden rounded-lg">
                <img src={accessories} className="object-cover h-full" alt="accessories" />
                </Link>
            </div>
            <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
            Accessories
            </h3>
             <Link to="/categories/Cameras"
            className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group">
            Explore Collection
        <ArrowRight size={17}
        className="transition-transform duration-300 group-hover:translate-x-1"/>
        </Link>
            </div>

            <div className="rounded-lg bg-white text-center p-3 shadow-sm">
            <div className="text-4xl">
                <Link to="/categories/Collectibles" className="block overflow-hidden rounded-lg">
                <img src={collectibles} className="object-cover h-full" alt="retro posters" />
                </Link>
            </div>
            <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
            Collectibles
            </h3>
             <Link to="/categories/Cameras"
            className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group">
            Explore Collection
        <ArrowRight size={17}
        className="transition-transform duration-300 group-hover:translate-x-1"/>
        </Link>
            </div>


        </div>

            </div>
        </div>
        </>
    )
}
export default Categories;