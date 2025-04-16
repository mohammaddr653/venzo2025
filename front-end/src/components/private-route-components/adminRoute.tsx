//this is private route component for admin route

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminRouteProps } from "../../types/privateRoutes/adminRoute";

const AdminRoute: React.FC<AdminRouteProps> = ({ user }) => {
  return user && user.isadmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
