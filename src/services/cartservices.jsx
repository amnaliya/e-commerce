

import axios from "axios";

const Api = "http://localhost:3000/cart";

export const getcart = async (userid) => {
    const response = await axios.get(`${Api}?userid=${userid}`);
    return response.data;
};

export const addcart = async (cartitem) => {

    console.log("ADDCART FUNCTION CALLED");
    console.log("CART ITEM:", cartitem);

    const response = await axios.get(
        `${Api}?userid=${cartitem.userid}`
    );

    console.log("EXISTING CART:", response.data);

    const existingitem = response.data.find(
        (item) => item.productId === cartitem.productId
    );

    console.log("EXISTING ITEM:", existingitem);

    if (existingitem) {

        const updated = await axios.patch(
            `${Api}/${existingitem.id}`,
            {
                quantity: existingitem.quantity + 1
            }
        );

        console.log("UPDATED ITEM:", updated.data);

        return updated.data;
    }

    const response2 = await axios.post(Api, cartitem);

    console.log("NEW ITEM CREATED:", response2.data);

    return response2.data;
};

export const updatecart=async(id,quantity)=>{
    const response=await axios.patch(`${Api}/${id}`,
        {
            quantity:quantity
        }
    )
    return response.data
};

export const deleting=async(id)=>{
    const response=await axios.delete(`${Api}/${id}`)
    return response.data
}

export const clearcart=async(userid)=>{
    const response=await axios.get(`${Api}?userid=${userid}`);
    for(const item of response.data){
        await axios.delete(`${Api}/${item.id}`)
    }
    return true;
}