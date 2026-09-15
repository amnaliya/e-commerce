import { useDispatch, useSelector } from "react-redux";
import { settingproduct } from "../../redux/Admin/ProductSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [form, setform] = useState(false);
  const[edit,setedit]=useState(null);
  const [product, setproduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchproducts();
  }, [dispatch]);

  const fetchproducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      dispatch(settingproduct(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleform = (e) => {
    setproduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleaddproduct = async () => {
      if(!product.name || !product.category || !product.price || !product.image){
        toast.warning("please fill all the fields")
        return;
      }
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        product
      );
    
      dispatch(settingproduct([...products, response.data]));
      setproduct({
        name: "",
        category: "",
        price: "",
        image: "",
      });
      toast.success("product added succesfully!")
      setform(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handledelete=async(id)=>{
    try{
        const response=await axios.delete(`http://localhost:3000/products/${id}`)
        const updated=products.filter((item)=>item.id !== id);
        dispatch(settingproduct(updated));
        toast.success("Product deleted successfully!");
    }
catch(error){
    console.log(error);
}

  }
  const handleedit=(product)=>{
    setproduct({
        name:product.name,
        category:product.category,
        price:product.price,
        image:product.image
    })
    setedit(product.id)
    setform(true);
  }
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-stone-500">Manage your store</p>

            <h1 className="font-serif text-3xl font-bold text-[#4A2C22]">
              Products
            </h1>
          </div>
          <button
            onClick={() => setform(true)}
            className="bg-[#1F4D3A] text-white px-5 py-3 rounded-lg"
          >
            Add Product
          </button>
        </div>
        {form && (
          <div className="bg-white rounded-xl border border-stone-200 mb-6 p-5">
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#4A2C22]">
                Add New Product
              </h2>

              <p className="text-sm text-stone-500 mt-1">
                Add a new product to your YESTERA collection.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                name="name"
                placeholder="Enter the Product name"
                value={product.name}
                onChange={handleform}
                className="w-full border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A]"
              />
              <input
                name="category"
                placeholder="Enter the Category"
                value={product.category}
                onChange={handleform}
                className="w-full border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A]"
              />
              <input
                name="price"
                placeholder="Enter the Price"
                value={product.price}
                onChange={handleform}
                className="w-full border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A]"
              />
              <input
                name="image"
                placeholder="Enter the Image URL"
                value={product.image}
                onChange={handleform}
                className="w-full border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-[#1F4D3A] focus:ring-1 focus:ring-[#1F4D3A]"
              />
            </div>

            <div className="mt-4">
              <button
                className="bg-[#1F4D3A] text-white px-4 py-2"
                onClick={handleaddproduct}
              >
                {edit ? "Update Product" : "Add Product"}
              </button>
              <button
                onClick={() => setform(false)}
                className=" ml-6 rounded-md border px-4 py-2 mr-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <p className="text-stone-500 mb-4">Total Products: {products.length}</p>

        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">
                  Product
                </th>

                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">
                  Price
                </th>

                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">
                  Stock
                </th>

                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-stone-100 hover:bg-stone-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />

                      <div>
                        <p className="font-medium text-[#4A2C22]">
                          {product.name}
                        </p>

                        <p className="text-xs text-stone-400">
                          ID: {product.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-stone-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-[#1F4D3A]">
                    ₹{product.price}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-700">
                      In Stock
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={()=>handleedit(product)}
                       className="px-3 py-2 text-sm border border-stone-200 rounded-lg hover:bg-stone-100">
                        Edit
                      </button>

                      <button onClick={()=>handledelete(product.id)}
                      className="px-3 py-2 text-sm text-red-600 border border-red-100 rounded-lg hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Products;
