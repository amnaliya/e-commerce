import { Navigate, Outlet } from "react-router-dom";

function UserRoute() {
  const role = localStorage.getItem("userrole");

  if (role === "admin") {
    return <Navigate to="/admindashboard" replace />;
  }

  return <Outlet />;
}

export default UserRoute;