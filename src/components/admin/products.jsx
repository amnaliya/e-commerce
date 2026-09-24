import { useDispatch, useSelector } from "react-redux";
import { settingproduct } from "../../redux/Admin/ProductSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [form, setform] = useState(false);
  const [edit, setedit] = useState(null);
  const [deleteproduct, setdeleteproduct] = useState(null);
  const [search, setsearch] = useState("");
  const [currentpage, setcurrentpage] = useState(1);
  const [itemsperpage] = useState(5);
  const[sort,setsort]=useState("all")
  const [product, setproduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchproducts();
  }, [dispatch]);
  useEffect(() => {
    setcurrentpage(1);
  }, [search]);

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
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.image
    ) {
      toast.warning("please fill all the fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        product,
      );

      dispatch(settingproduct([...products, response.data]));
      setproduct({
        name: "",
        category: "",
        price: "",
        image: "",
      });
      toast.success("product added succesfully!");
      setform(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${id}`,
      );
      const updated = products.filter((item) => item.id !== id);
      dispatch(settingproduct(updated));
      setdeleteproduct(null);
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  const handlesoftdelete = async (id) => {
    const selected = products.find((item) => item.id === id);
    const updated = {
      ...selected,
      deleted: true,
    };
    await axios.patch(`http://localhost:3000/products/${id}`, updated);
    const updatedproducts = products.map((item) => {
      if (item.id === id) {
        return updated;
      }
      return item;
    });
    dispatch(settingproduct(updatedproducts));
    setdeleteproduct(null);
    toast.success("Product Moved To Trash");
  };
  const handleedit = (product) => {
    setproduct({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    });
    setedit(product.id);
    setform(true);
  };
  const handleupdatedproduct = async () => {
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.image
    ) {
      toast.warning("Please fill all the fields");
      return;
    }
    try {
      const response = await axios.patch(
        `http://localhost:3000/products/${edit}`,
        product,
      );
      const updatedproducts = products.map((item) => {
        if (item.id === edit) {
          return response.data;
        }
        return item;
      });
      dispatch(settingproduct(updatedproducts));
      setproduct({
        name: "",
        category: "",
        price: "",
        image: "",
      });
      setedit(null);
      setform(false);
      toast.success("Product Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("failed to edit");
    }
  };
 const filteredProducts = products.filter((product) => {

  if (product.deleted) {
    return false;
  }

  if (
    !product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  ) {
    return false;
  }

  if (sort === "instock") {
    return Number(product.stock) > 0;
  }

  if (sort === "outofstock") {
    return Number(product.stock) === 0;
  }

  return true;
});
 
  const lastindex = currentpage * itemsperpage;
  const firstindex = lastindex - itemsperpage;
  const currentproduct = filteredProducts.slice(firstindex, lastindex);
  const totalpages = Math.ceil(filteredProducts.length / itemsperpage);
  const deletedproducts = products.filter((value) => value.deleted);
  const handlerestore = async (id) => {
    try {
      const selected = products.find((product) => product.id === id);
      const updated = {
        ...selected,
        deleted: false,
      };
      await axios.patch(`http://localhost:3000/products/${id}`, updated);

      const updatedproducts = products.map((product) => {
        if (product.id === id) {
          return updated;
        }

        return product;
      });

      dispatch(settingproduct(updatedproducts));

      toast.success("Product Restored");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
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

            <div className="mt-4  flex flex-col sm:flex-row gap-3">
              <button
                className="bg-[#1F4D3A] text-white px-4 py-2"
                onClick={edit ? handleupdatedproduct : handleaddproduct}
              >
                {edit ? "Update Product" : "Add Product"}
              </button>
              <button
                onClick={() => setform(false)}
                className="rounded-md border px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1F4D3A]"
          />
            <select
  value={sort}
  onChange={(e) => setsort(e.target.value)}
  className="px-4 py-2 border border-[#e8dfd2] ml-10 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#1F4D3A]"
>
  <option value="all">All Products</option>
  <option value="instock">In Stock</option>
  <option value="outofstock">Out of Stock</option>
</select>
        </div>
        <p className="text-stone-500 mb-4">
          Total Products: {filteredProducts.length}
        </p>
        {filteredProducts.length === 0 ? (
          <h1 className="font-bold text-1xl font-serif">No Matches Found !!</h1>
        ) : (
         <div className="bg-white rounded-xl border border-stone-200">
  <div className="overflow-x-auto w-full">
    <table className="min-w-[800px] w-full">
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
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentproduct.map((product) => (
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
                          {product.stock}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {product.stock > 0 ? (
                          <span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-700">
                            In Stock
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-sm bg-red-50 text-red-700">
                            Out of Stock
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleedit(product)}
                            className="px-3 py-2 text-sm border border-stone-200 rounded-lg hover:bg-stone-100"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => setdeleteproduct(product.id)}
                            className="px-3 py-2 text-sm text-red-600 border border-red-100 rounded-lg hover:bg-red-50"
                          >
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
        )}
        <div className="bg-white rounded-xl shadow-sm mt-8 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#4A2C22]">Trash</h2>
              <p className="text-sm text-gray-500 mt-1">
                Deleted products can be restored or permanently removed.
              </p>
            </div>

            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium">
              {deletedproducts.length} Deleted
            </div>
          </div>

          {deletedproducts.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-4xl mb-3">🗑️</div>

              <h3 className="text-lg font-medium text-gray-700">
                Trash is empty
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Deleted products will appear here.
              </p>
            </div>
          ) : (
           
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">
                      Product
                    </th>

                    <th className="px-4 py-3 text-sm font-medium text-gray-500">
                      Category
                    </th>

                    <th className="px-4 py-3 text-sm font-medium text-gray-500">
                      Price
                    </th>

                    <th className="px-4 py-3 text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {deletedproducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />

                          <span className="font-medium text-[#4A2C22]">
                            {product.name}
                          </span>
                        </div>
                      </td>

                     
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {product.category}
                      </td>

                     
                      <td className="px-4 py-4 text-sm font-medium text-gray-700">
                        ₹{product.price}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlerestore(product.id)}
                            className="px-3 py-2 rounded-lg text-sm bg-green-50 text-green-700 hover:bg-green-100"
                          >
                            Restore
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center mt-6 gap-3">
          <button
            onClick={() => setcurrentpage(currentpage - 1)}
            disabled={currentpage === 1}
            className="px-4 py-2 rounded-lg bg-[#1F4D3A] text-white disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-[#4A2C22] font-medium">
            Page{currentpage} Of {totalpages}
          </span>
          <button
            onClick={() => setcurrentpage(currentpage + 1)}
            disabled={currentpage === totalpages}
            className="px-4 py-2 rounded-lg bg-[#1F4D3A] text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
      {deleteproduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#f7f3eb]  rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-[#4A2C22]">Delete Product</h2>

            <p className="text-sm text-stone-500 mt-2">
              How would you like to delete this product?
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded-lg bg-[#a95b3c] text-white text-sm font-medium hover:bg-[#8f4930] transition"
                onClick={() => handlesoftdelete(deleteproduct)}
              >
                Soft Delete
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-[#8b2e2e] text-white text-sm font-medium hover:bg-[#6f2222] transition"
                onClick={() => handledelete(deleteproduct)}
              >
                Permanently Delete
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-[#e8dfd2] text-[#4A2C22] text-sm font-medium hover:bg-[#d8cdbd] transition"
                onClick={() => setdeleteproduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Products;
