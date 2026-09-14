import cameracover from "../assets/camera cover page.png";
import vinylrecord from "../assets/vinyl record cover.jpg";
import retroposter from "../assets/posters.png";
import accessories from "../assets/accessories cover.png";
import collectibles from "../assets/collectibles cover.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Categorysection() {
  return (
    <>
      <div className="px-4 py-16 bg-[#f7f3eb] sm:px-7 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-xs tracking-widest text-[#1F4D3A] sm:text-sm">
              EXPLORE YESTERRA
            </p>
            <h2 className="font-serif  text-[#1F4D3A] mt-2 font-bold text-4xl sm:text-4xl">
              Shop By Category
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6 ">
            <div className="rounded-lg bg-white text-center p-3 shadow-sm sm:p-3">
              <div className="text-4xl">
                <Link to="/categories/Cameras">
                  <img
                    src={cameracover}
                    className="aspect-square w-full rounded-md object-cover"
                    alt="vintage camera cover page"
                  />
                </Link>
              </div>
              <h3 className="mt-4  text-[#4A2C22] font-serif text-lg font-semibold">
                Vintage Camera
              </h3>
              <Link
                to="/categories/Cameras"
                className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group"
              >
                Explore Collection
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="rounded-lg bg-white text-center p-3 shadow-sm">
              <div className="text-4xl">
                <Link to="/categories/Vinyl Records">
                  <img
                    src={vinylrecord}
                    className="aspect-square w-full rounded-md object-cover"
                    alt="vinyl records"
                  />
                </Link>
              </div>
              <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
                Vinyl Records
              </h3>
              <Link
                to="/categories/Cameras"
                className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group"
              >
                Explore Collection
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="rounded-lg bg-white text-center p-3 shadow-sm">
              <div className="text-4xl">
                <Link to="/categories/Retro Poster">
                  <img
                    src={retroposter}
                    className="aspect-square w-full rounded-md object-cover"
                    alt="retro posters"
                  />
                </Link>
              </div>
              <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
                Retro Posters
              </h3>
              <Link
                to="/categories/Cameras"
                className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group"
              >
                Explore Collection
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="rounded-lg bg-white text-center p-3 shadow-sm">
              <div className="text-4xl">
                <Link to="/categories/Accessories">
                  <img
                    src={accessories}
                    className="aspect-square w-full rounded-md object-cover"
                    alt="accessories"
                  />
                </Link>
              </div>
              <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
                Accessories
              </h3>
              <Link
                to="/categories/Cameras"
                className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group"
              >
                Explore Collection
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="rounded-lg bg-white text-center p-3 shadow-sm">
              <div className="text-4xl">
                <Link to="/categories/Collectibles">
                  <img
                    src={collectibles}
                    className="aspect-square w-full rounded-md object-cover"
                    alt="retro posters"
                  />
                </Link>
              </div>
              <h3 className="mt-4 text-[#4A2C22] font-serif text-lg font-semibold">
                Collectibles
              </h3>
              <Link
                to="/categories/Cameras"
                className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group"
              >
                Explore Collection
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categorysection;
