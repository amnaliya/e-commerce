import { Cartcontext } from "../context/cartcontext";
import { useContext } from "react";

function Checkout(){
const {cart}=useContext(Cartcontext)

const total=cart.reduce((total,product)=>{
    return total + product.price * product.quantity
},0)

return (
    <>
    <div>
        <h1>CHECK OUT </h1>

    </div>
    </>
)
}
export default Checkout;