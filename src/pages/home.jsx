import yesterabanner from "../assets/yestera org.png"
import Categorysection from "../components/categoriessection";
import Featuredpicks from "../components/featuredpicks";
import { Link } from "react-router-dom";


function Home(){
    return(
        <>
         <div className="relative w-full overflow-hidden">
             <img src={yesterabanner} className="h-[580px]  block w-full object-cover" alt="YESTERA-IMAGE" />

        {/* <img src="/frontpage.png" alt="Crochettella" className="w-full h-auto block"/> */}
        <Link to="/shop"
        className="absolute bottom-[5%] left-[25%] -translate-x-1/2 
        bg-[#6B4632] text-white px-8 py-3 mb-5 rounded-full 
        hover:bg-[#5A4030] transition whitespace-nowrap">SHOP NOW →</Link>
         </div>     
         {/* <h1 className="text-5xl font-bold text-center">HOME</h1> */}
        
         <Categorysection />
         <Featuredpicks />
         </>
    )
}

export default Home;