import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";

function Featuredpicks(){
    const [products, setProducts] = useState([]);

useEffect(() => {
    axios.get("http://localhost:3000/products")
        .then((response) => {
            setProducts(response.data.slice(0, 4));
        })
        .catch((error) => {
            console.log(error);
        });
}, []);
return (
    <>
    <div className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">

            <div className="mb-10 text-center">
            <p className="text-sm tracking-widest text-[#1F4D3A]">
            HANDPICKED FOR YOU
            </p>
                <h3 className="font-serif text-4xl font-bold mt-3 text-[#1F4D3A]">
                Featured Collections</h3>
            </div>

           <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            
    {products.map((product) => (
        <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group overflow-hidden rounded-lg border border-stone-200 bg-[#f7f3eb] shadow-sm"
        >
            <div className="h-60 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-4">
                <p className="text-sm text-stone-500">
                    {product.category}
                </p>

                <h4 className="mt-2 font-serif text-lg font-semibold text-[#4A2C22]">
                    {product.name}
                </h4>

                <p className="mt-2 font-medium text-[#1F4D3A]">
                    ₹{product.price}
                </p>
                
            </div>
        </Link>
    ))}
</div>
     <Link to="/shop"
         className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1F4D3A] group">
                        Explore More
                    <ArrowRight size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"/>
                    </Link>


        </div>
    </div>

    </>
)
}
export default Featuredpicks