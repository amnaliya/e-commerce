import {
  getorders,
  updateorderstatus,
} from "../../services/Admin/Orderservice";
import { settingorders } from "../../redux/Admin/Orderslice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function Orders() {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [selectedorder, setselectedorder] = useState(null);
  const [currentpage, setcurrentpage] = useState(1);
  const[sort,setsort]=useState("newest")
  const[search,setsearch]=useState("")
  const itemsperpage = 5;
  const lastindex = currentpage * itemsperpage;
  const firstindex = lastindex - itemsperpage;
  const currentorders = orders.slice(firstindex, lastindex);
  const totalpages = Math.ceil(orders.length / itemsperpage);
  useEffect(() => {
    fetchorders();
  }, []);
  const fetchorders = async () => {
    try {
      const response = await getorders();
      dispatch(settingorders(response));
    } catch (error) {
      console.log(error);
    }
  };
  const handlestatus = async (id, status) => {
    try {
      await updateorderstatus(id, status);
      const updateorders = orders.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: status,
          };
        }
        return item;
      });
      dispatch(settingorders(updateorders));
    } catch (error) {
      console.log(error);
    }
  };
  const getstatusstyle = (status) => {
    if (status === "Pending") {
      return "bg-yellow-50 text-yellow-700";
    }

    if (status === "Processing") {
      return "bg-blue-50 text-blue-700";
    }

    if (status === "Shipped") {
      return "bg-red-50 text-red-700";
    }

    if (status === "Delivered") {
      return "bg-green-50 text-green-700";
    }
    if (status === "Cancelled") return "bg-brown-50 text-gray-800";

    return "bg-gray-50 text-gray-600";
  };
  const filtering=orders.filter((item)=>{
  return (
    item.id.toLowerCase().includes(search.toLowerCase())||
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.email.toLowerCase().includes(search.toLowerCase())
  )
  }).sort((a,b)=>{
    if(sort==="high"){
      return Number(b.total) - Number (a.total)
    }
    if(sort==="low"){
      return Number(a.total) - Number (b.total)
    }
    if(sort==="oldest"){
      return new Date(a.date) - new Date(b.date)
    }
    return new Date(b.date) - new Date(a.date)
  })
  return (
    <>
      <div>

        <div className=" bg-white rounded-xl shadow-sm border border-[#e8dfd2] overflow-hidden">
          <div className="px-4 sm:px-6 py-5 border-b border-[#e8dfd2]">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

  
    <div>
      <h2 className="text-lg font-bold text-[#4A2C22]">
        Order Management
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Manage customer orders and view order details
      </p>
    </div>

   
    <input
      type="text"
      placeholder="Search orders..."
      value={search}
      onChange={(e) => setsearch(e.target.value)}
      className="w-full sm:w-72 px-4 py-2 border border-[#e8dfd2] rounded-lg outline-none focus:ring-2 focus:ring-[#1F4D3A]"
    />
    <select
        value={sort}
        onChange={(e) => setsort(e.target.value)}
        className="w-full sm:w-48 px-4 py-2 border border-[#e8dfd2] rounded-lg outline-none focus:ring-2 focus:ring-[#1F4D3A] bg-white"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="high">Total: High to Low</option>
        <option value="low">Total: Low to High</option>
      </select>

  </div>
</div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1F4D3A] text-white">
                  <th className="px-6 py-4 text-left text-xs uppercase">
                    Order ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs uppercase">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs uppercase">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs uppercase">
                    Items
                  </th>

                  <th className="px-6 py-4 text-left text-xs uppercase">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs uppercase">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtering.map((item) => (
                  <tr key={item.id} className="border-b border-[#eee7dc]">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.id}
                    </td>

                    <td className="px-6 py-4 font-medium text-[#4A2C22]">
                      {item.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.items.length}
                    </td>

                    <td className="px-6 py-4 font-medium text-[#1F4D3A]">
  ₹{item.total}
</td>

<td className="px-6 py-4">
  <select
    value={item.status || "Pending"}
    onChange={(e) => handlestatus(item.id, e.target.value)}
    className={`px-3 py-2 rounded-lg border-0 text-sm font-medium ${getstatusstyle(
      item.status || "Pending"
    )}`}
  >
    <option value="Pending">Pending</option>
    <option value="Processing">Processing</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</td>

<td className="px-6 py-4">
  <button
    onClick={() => setselectedorder(item)}
    className="px-4 py-2 rounded-lg bg-[#f7f3eb] text-[#4A2C22] hover:bg-[#e8dfd2] transition text-sm font-medium"
  >
    View Details
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-center gap-4 py-5">
              <button
                onClick={() => setcurrentpage(currentpage - 1)}
                disabled={currentpage === 1}
                className="px-4 py-2 rounded-lg bg-[#1F4D3A] text-white disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-[#4A2C22] font-medium">
                Page {currentpage} of {totalpages}
              </span>

              <button
                onClick={() => setcurrentpage(currentpage + 1)}
                disabled={currentpage === totalpages}
                className="px-4 py-2 rounded-lg bg-[#1F4D3A] text-white disabled:opacity-40"
              >
                Next
              </button>
            </div>
      {selectedorder && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

    <div className="bg-[#f7f3eb] rounded-2xl w-full max-w-lg max-h-[90vh] shadow-xl flex flex-col">

      
      <div className="p-6 border-b border-[#e8dfd2]">
        <h2 className="text-xl font-semibold text-[#4A2C22]">
          Order Details
        </h2>
      </div>

    
      <div className="p-6 overflow-y-auto">

        <div className="space-y-2">

          <p>
            <span className="font-medium">Order ID:</span>{" "}
            {selectedorder.id}
          </p>

          <p>
            <span className="font-medium">Customer:</span>{" "}
            {selectedorder.name}
          </p>

          <p>
            <span className="font-medium">Email:</span>{" "}
            {selectedorder.email}
          </p>

          <p>
            <span className="font-medium">Phone:</span>{" "}
            {selectedorder.number}
          </p>

          <p className="whitespace-pre-line">
            <span className="font-medium">Address:</span>{" "}
            {selectedorder.address}
          </p>

          <p>
            <span className="font-medium">City:</span>{" "}
            {selectedorder.city}
          </p>

          <p>
            <span className="font-medium">Pincode:</span>{" "}
            {selectedorder.pincode}
          </p>

          <p>
            <span className="font-medium">Total:</span>{" "}
            ₹{selectedorder.total}
          </p>

          <p>
            <span className="font-medium">Date:</span>{" "}
            {selectedorder.date}
          </p>

        </div>

        {/* Products */}
        <div className="mt-5">
          <h3 className="font-semibold text-[#4A2C22]">
            Products
          </h3>

          {selectedorder.items.map((product) => (
            <div
              key={product.id}
              className="mt-3 p-3 bg-white rounded-lg"
            >
              <p className="font-medium">
                {product.name}
              </p>

              <p className="text-sm text-gray-500">
                Price: ₹{product.price}
              </p>

              <p className="text-sm text-gray-500">
                Quantity: {product.quantity}
              </p>
            </div>
          ))}
        </div>

      </div>

      
      <div className="flex justify-end p-6 border-t border-[#e8dfd2]">
        <button
          onClick={() => setselectedorder(null)}
          className="px-4 py-2 rounded-lg bg-[#1F4D3A] text-white hover:bg-[#163a2c]"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
          </div>
        </div>
      </div>
    </>
  );
}
export default Orders;
