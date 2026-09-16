import axios from "axios";
const Api="http://localhost:3000/users";

export const getusers=async()=>{
    const response=await axios.get(Api);
    return response.data
}
export const blockusers=async(id,blocked)=>{
    const response=await axios.patch(`${Api}/${id}`,
        {blocked:blocked}
    )
    return response.data;
}