import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

function Protection(){
    const userid=useSelector((state)=>state.auth.userid);

    if(userid){
    return <Navigate to="/" replace />
    }
    return <Outlet />
}
export default Protection;