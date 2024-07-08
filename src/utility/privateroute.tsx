// import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { clearAll } from "../Service/Localstorage";
import { toast } from "sonner";
import { getAuthData } from ".";

const PrivateRoute = ({ roles }: any) => {
  const user = getAuthData();
  if (!user) {
    clearAll();
    return <Navigate to="/signin" />;
  }
  if (roles && !roles.includes(user.role)) {
    toast.error("Access Denied");
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
