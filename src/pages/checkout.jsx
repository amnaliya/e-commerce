// import { Cartcontext } from "../context/cartcontext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addtocart, clearcart } from "../redux/cartslice";
import { clearcart as clearcartapi } from "../services/cartservices";

function Checkout() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [address, setadrres] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [number, setnumber] = useState("");
  const [paymentmethod, setpaymentmethod] = useState("cod");
  const [load, setload] = useState("");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const userid = useSelector((state) => state.auth.userid);
  const navigate = useNavigate();
  // const {cart,clearcart}=useContext(Cartcontext)
  const total = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  async function handlecheck() {
    if (total === 0) {
      toast.error("you want to order something");
      navigate("/shop");
      return;
    }
  }

  async function handleorder() {
    if (!name || !email || !address || !city || !pincode || !number) {
      toast.warning("please fill all the fields");
      return;
    }

    const order = {
      userid,
      name,
      email,
      address,
      city,
      pincode,
      number,
      total,
      items: cart,
      paymentmethod,
    };
    try {
      const response = await axios.post("http://localhost:3000/orders", order);
      console.log(response.data);
      toast.success("order placed successfully");
      await clearcartapi(userid);
      dispatch(clearcart());
      navigate("/ordersuccess");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  return (
    <>
      <div className="bg-[#f7f3eb] min-h-screen px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h1 className="text-center font-bold text-3xl text-[#5c4033] mb-6 py-1 sm:mb-8 sm:text-4xl ">
          CHECK OUT{" "}
        </h1>

        <div className="mx-auto max-w-6xl grid gap-6 grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
          <div className="rounded-xl bg-white p-4 shadow-md sm:p-6 lg:p-7">
            <h2 className="font-bold  text-[#5c4033] text-xl sm:text-2xl  ">
              Shipping Details{" "}
            </h2>
            <div>
              <form className="space-y-3 mt-5">
                {/* <div className="grid grid-cols-1 gap-3 mt-5"> */}
                <input
                  type="text"
                  placeholder="enter your name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 sm:text-base outline-none transition focus:border-[#5c4033]"
                />
                <input
                  className="w-full rounded-md border border-gray-300 p-3 outline-none transition focus:border-[#5c4033] sm:text-base"
                  type="email"
                  placeholder="enter your email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />

                <textarea
                  className="w-full rounded-md border border-gray-300 p-3 outline-none transition focus:border-[#5c4033] sm:text-base"
                  rows={3}
                  cols={5}
                  placeholder="enter your address"
                  value={address}
                  onChange={(e) => setadrres(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                  <input
                    className="w-full rounded-md border border-gray-300 p-3 outline-none transition focus:border-[#5c4033] sm:text-base"
                    type="text"
                    placeholder="enter your city"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                  />

                  <input
                    className="w-full rounded-md border border-gray-300 p-3 outline-none transition focus:border-[#5c4033] sm:text-base"
                    type="number"
                    placeholder="enter your pincode"
                    value={pincode}
                    onChange={(e) => setpincode(e.target.value)}
                  />
                </div>

                <input
                  className="w-full rounded-md border border-gray-300 p-3 outline-none transition focus:border-[#5c4033] sm:text-base"
                  type="number"
                  placeholder="enter your Phone number"
                  value={number}
                  onChange={(e) => setnumber(e.target.value)}
                />
              </form>
              <div className="mt-6">
                <h2 className="mb-4 text-xl font-bold text-[#5c4033] sm:text-2xl">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-300 p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentmethod === "cod"}
                      onChange={(e) => setpaymentmethod(e.target.value)}
                    />

                    <div>
                      <p className="font-semibold text-[#5c4033]">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-gray-500">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-300 p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentmethod === "card"}
                      onChange={(e) => setpaymentmethod(e.target.value)}
                    />

                    <div>
                      <p className="font-semibold text-[#5c4033]">
                        Credit / Debit Card
                      </p>
                      <p className="text-sm text-gray-500">
                        Pay securely using your card
                      </p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-300 p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentmethod === "upi"}
                      onChange={(e) => setpaymentmethod(e.target.value)}
                    />

                    <div>
                      <p className="font-semibold text-[#5c4033]">UPI</p>
                      <p className="text-sm text-gray-500">Pay using UPI</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-xl p-4 sm:p-6 lg:sticky lg:top-24 lg:p-7 shadow-md bg-white">
            <h2 className="mb-5  text-xl sm:text-2xl font-bold text-[#5c4033]">
              ORDER SUMMARY
            </h2>
            <div className="mb-6 space-y-4">
              {cart.map((product) => (
                <div
                  className="flex items-start  gap-3 justify-between border-b pb-3"
                  key={product.id}
                >
                  <h3 className="text-[#5c4033] font-semibold break-words ">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 ">
                    Quantity:{product.quantity}
                  </p>
                  <p className=" text-[#5c4033] font-medium shrink-0">
                    {" "}
                    ₹{product.price * product.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-b pt-5 border-gray300">
              <p className="font-bold text-xl sm:text-2xl text-[#5c4033]">
                TOTAL:₹{total}
              </p>
            </div>
            <div className="flex justify-center  mt-7">
              <button
                className="mt-6 w-full rounded-md bg-[#5c4033] text-sm py-3 font-semibold text-white sm:mt-7 sm:text-base"
                onClick={handleorder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Checkout;
