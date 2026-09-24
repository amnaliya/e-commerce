import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getorders, cancelordering } from "../services/Admin/Orderservice";
function Orderhistory() {
  const [orders, setorders] = useState([]);
  const userid = useSelector((state) => state.auth.userid);
  useEffect(() => {
    if (userid) {
      fetchorders();
    }
  }, [userid]);
  const fetchorders = async () => {
    try {
      const response = await getorders(userid);
      setorders(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handlecancel = async (id) => {
    try {
      const updatedorder = await cancelordering(id);

      setorders((prevorders) =>
        prevorders.map((order) => (order.id === id ? updatedorder : order)),
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#f7f3eb] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto mb-12 max-w-5xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#1F4D3A]">
          YESTERA
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#4A2C22] sm:text-5xl">
          Order History
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          A record of the pieces you've chosen to bring home.
        </p>
      </div>
      {orders.length === 0 ? (
        <div className="mx-auto max-w-3xl border border-stone-200 bg-white px-6 py-20 text-center">
          <p className="font-serif text-2xl text-[#4A2C22]">No orders yet</p>
          <p className="mt-3 text-sm text-gray-500">
            Your order history will appear here once you make a purchase.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl space-y-8">
          {orders.map((value) => (
            <div key={value.id} className="border border-stone-200 bg-white">
              <div className="flex flex-col gap-5 border-b border-stone-200 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                      Order
                    </p>
                  </div>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-[#4A2C22]">
                    #{value.id}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{value.name}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                    Order Total
                  </p>
                  <p className="mt-1 font-serif text-2xl font-bold text-[#1F4D3A]">
                    ₹{value.total}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-gray-400">
                    Status
                  </p>
                  {value.status !== "Cancelled" &&
                    value.status !== "Delivered" && (
                      <button
                        onClick={() => handlecancel(value.id)}
                        className="mt-3 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100"
                      >
                        Cancel Order
                      </button>
                    )}

                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                      value.status === "Pending"
                        ? "bg-yellow-50 text-yellow-700"
                        : value.status === "Processing"
                          ? "bg-blue-50 text-blue-700"
                          : value.status === "Shipped"
                            ? "bg-red-50 text-red-700"
                            : value.status === "Delivered"
                              ? "bg-green-50 text-green-700"
                              : value.status === "Cancelled"
                                ? "bg-brown-50 text-brown-700"
                                : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {value.status || "Pending"}
                  </span>
                </div>
              </div>
              <div className="divide-y divide-stone-200">
                {value.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 px-5 py-6 sm:gap-6 sm:px-8"
                  >
                    <div className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-20 object-cover sm:h-28 sm:w-24"
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-[#4A2C22] sm:text-xl">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Unit price: ₹{item.price}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#1F4D3A] sm:text-base">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-stone-200 px-5 py-6 sm:px-8">
                <div>
                  <p className="font-serif text-lg font-bold text-[#4A2C22]">
                    Total
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Thank you for shopping with YESTERA
                  </p>
                </div>
                <p className="font-serif text-2xl font-bold text-[#1F4D3A]">
                  ₹{value.total}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Orderhistory;
