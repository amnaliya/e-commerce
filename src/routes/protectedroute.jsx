import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Protectedroute(){
    const userid=useSelector((state)=>state.auth.userid)

    if(!userid){
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default Protectedroute;