//this is private route component for user route

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserRouteProps } from "../../types/privateRoutes/userRoute";

const UserRoute: React.FC<UserRouteProps> = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default UserRoute;
