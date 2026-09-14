import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

function Protection(){
    const userid=useSelector((state)=>state.auth.userid);
    const role=useSelector((state)=>state.auth.role)

    if(userid){
        if(role==="admin"){
            return <Navigate to="/admindashboard" replace />
        }
        
    return <Navigate to="/" replace />
    }
    return <Outlet />
}
export default Protection;