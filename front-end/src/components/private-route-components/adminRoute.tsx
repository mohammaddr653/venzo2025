//this is private route component for admin route

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminRouteProps } from "../../types/privateRoutes/adminRoute";

const AdminRoute: React.FC<AdminRouteProps> = ({ user }) => {
  if (user && user.isadmin) {
    return user.verified ? <Outlet /> : <Navigate to="/verify" replace />;
  } else {
    return <Navigate to="/"/>;
  }
};

export default AdminRoute;
