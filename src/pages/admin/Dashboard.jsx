
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { settingproduct } from "../../redux/Admin/ProductSlice";
import { getusers } from "../../services/Admin/Userservices";
import {getorders} from "../../services/Admin/Orderservice"
import { settingorders } from "../../redux/Admin/Orderslice";
import{settingusers} from "../../redux/Admin/Userslice";
import { Link } from "react-router-dom";
import { getMonthlyrevenue } from "./getrevenuedata";
import { AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer } from "recharts";

function Dashboard(){
    const dispatch=useDispatch();
    const products=useSelector((state)=>state.products.products)
    const users=useSelector((state)=>state.users.users)
    const orders=useSelector((state)=>state.orders.orders)
    const totalrevenue=orders.reduce((total,order)=>{
        return total + Number(order.total)
    },0)
    const monthlyrevenue=getMonthlyrevenue(orders);
    console.log("Orders:", orders);
  console.log("Monthly Revenue:", monthlyrevenue);
    useEffect(() => {
  fetchproducts();
}, []);
useEffect(()=>{
    fetchusers()
},[])
useEffect(()=>{
    fetchorders()
},[])
const fetchusers=async ()=>{
    try{
        const response=await getusers();
        dispatch(settingusers(response))
    }catch(error){
        console.log(error)
    }
}
const fetchorders=async()=>{
    try{
        const response=await getorders();
        dispatch(settingorders(response))
    }catch(error){
        console.log(error)
    }
}

const fetchproducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");

    dispatch(settingproduct(response.data));
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

  return "bg-gray-50 text-gray-600";
};
    return (
        <>
        <div className="mb-8">
  <h1 className="text-2xl font-bold font-serif text-[#4A2C22]">
    Welcome Back, Admin 👋
  </h1>

  <p className="text-gray-500 mt-1">
    Here's what's happening with your store today.
  </p>
</div>
    
        <div className="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-8">

  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#e8dfd2]">
    <p className="text-sm text-gray-500">Total Products</p>
    <h2 className="text-2xl sm:text-3xl font-semibold text-[#1F4D3A] mt-2">
      {products.filter((product) => !product.deleted).length}
    </h2>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dfd2]">
    <p className="text-sm text-gray-500">Total Users</p>
    <h2 className="text-2xl sm:text-3xl font-semibold text-[#1F4D3A] mt-2">
      {users.length}
    </h2>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dfd2]">
    <p className="text-sm text-gray-500">Total Orders</p>
    <h2 className="text-2xl sm:text-3xl font-semibold text-[#1F4D3A] mt-2">
      {orders.length}
    </h2>
  </div>
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dfd2]">
  <p className="text-sm text-gray-500">Total Revenue</p>

  <h2 className="text-2xl sm:text-3xl font-semibold text-[#1F4D3A] mt-2">
    ₹{totalrevenue}
  </h2>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-5 mt-8">
  <h2 className="text-xl font-semibold text-[#4A2C22] mb-5">
    Revenue Details
  </h2>

  <div className="w-full h-[250px] sm:h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={monthlyrevenue}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
       <YAxis
  tickFormatter={(value) => `₹${value}`}  width={60}
/>

<Tooltip
  formatter={(value) => [`₹${value}`, "Revenue"]}
/>
   <Area
        type="monotone"
        dataKey="revenue"
        stroke="#325527"
        fill="#24411a"
        fillOpacity={0.15}
        strokeWidth={3}
      />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
 <div className="bg-white rounded-xl shadow-sm p-5">
    <h2 className="text-xl font-semibold text-[#4A2C22] mb-4">
      Recent Orders
    </h2>

  <div className="overflow-x-auto">
  <table className="w-full min-w-[600px]">
      <thead className="bg-[#1F4D3A] text-white">
        <tr>
          <th className="px-4 py-3 text-left">Order ID</th>
          <th className="px-4 py-3 text-left">Customer</th>
          <th className="px-4 py-3 text-left">Total</th>
          <th className="px-4 py-3 text-left">Status</th>
        </tr>
      </thead>

      <tbody>
         {orders.length === 0 ? (
    <tr>
      <td
        colSpan="4"
        className="text-center py-8 text-gray-500"
      >
        No orders found
      </td>
    </tr>
  ) : (
        orders.slice(0, 6).map((order) => (
          <tr key={order.id} className="border-b">
            <td className="px-4 py-3">
              #{order.id}
            </td>

            <td className="px-4 py-3">
              {order.name}
            </td>

            <td className="px-4 py-3">
              ₹{order.total}
            </td>

            <td className="px-4 py-3">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${getstatusstyle(
      order.status || "Pending"
    )}`}
  >
    {order.status || "Pending"}
  </span>
</td>
          </tr>
        )))}
      </tbody>
    </table>
    <div className="flex justify-end mt-4">
        <Link  to="/admin/orders"
    className="px-5 py-2 bg-[#1F4D3A] text-white rounded-lg hover:bg-[#a95b3c] transition">
        View All</Link>
    </div>
  </div>
</div>
<div className="bg-white rounded-xl shadow-sm p-5 overflow-hidden">

  <h2 className="text-xl font-semibold text-[#4A2C22] mb-4">
    Recent Products
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full">

      <thead className="bg-[#1F4D3A] text-white">
        <tr>
          <th className="px-4 py-3 text-left">Product</th>
          <th className="px-4 py-3 text-left">Category</th>
          <th className="px-4 py-3 text-left">Price</th>
        </tr>
      </thead>

      <tbody>
         {products.length === 0 ? (
    <tr>
      <td
        colSpan="4"
        className="text-center py-8 text-gray-500"
      >
        No Products found
      </td>
    </tr>
  ) : (
        products
          .filter((product) => !product.deleted)
          .slice(0, 5)
          .map((product) => (
            <tr
              key={product.id}
              className="border-b border-gray-100 hover:bg-[#f7f3eb]"
            >

              <td className="px-4 py-3">
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

              <td className="px-4 py-3 text-sm text-gray-500">
                {product.category}
              </td>

              <td className="px-4 py-3 font-semibold text-[#1F4D3A]">
                ₹{product.price}
              </td>

            </tr>
          )))}
      </tbody>

    </table>
  </div>
   <div className="flex justify-end mt-4">
        <Link  to="/admin/products"
    className="px-5 py-2 bg-[#1F4D3A] text-white rounded-lg hover:bg-[#a95b3c] transition">
        View All</Link>
    </div>

</div>
</div>

        </>
    )
}
export default Dashboard;