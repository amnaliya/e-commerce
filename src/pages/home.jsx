import yesterabanner from "../assets/yestera org.png";
import Categorysection from "../components/categoriessection";
import Featuredpicks from "../components/featuredpicks";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        <img
          src={yesterabanner}
          className=" block h-auto w-full"
          alt="YESTERA-IMAGE"
        />

        <Link
          to="/shop"
          className="absolute bottom-[140px] left-1/4 -translate-x-1/2 
        bg-[#6B4632] text-white text-sm px-8 py-2.5 mb-5 rounded-full 
         transition hover:bg-[#5A4030] whitespace-nowrap sm:px-8 sm:py-3 sm:text-base"
        >
          SHOP NOW →
        </Link>
      </div>
      {/* <h1 className="text-5xl font-bold text-center">HOME</h1> */}

      <Categorysection />
      <Featuredpicks />
    </>
  );
}

export default Home;
