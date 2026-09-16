import axios from "axios";
const Api="http://localhost:3000/orders"

export const getorders=async()=>{
    const response=await axios.get(Api)
    return response.data;
}
export const updateorderstatus=async(id,status)=>{
    const response=await axios.patch(`${Api}/${id}`,
        {status:status}
    )
    return response.data
}
