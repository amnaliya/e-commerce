import axios from "axios";

const Api="http://localhost:3000/wishlist"

export const getwishlist=async(userid)=>{
 const response=await axios.get(`${Api}?userid=${userid}`);
 return response.data
};

export const addtowishlist=async(item)=>{
    const response=await axios.post(Api,item)
    return response.data;
}

export const deleting=async(id)=>{
    const response=await axios.delete(`${Api}/${id}`);
    return response.data;
}