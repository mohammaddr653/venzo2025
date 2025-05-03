//this is private route component for user route

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserRouteProps } from "../../types/privateRoutes/userRoute";

const UserRoute: React.FC<UserRouteProps> = ({ user }) => {
  if (user) {
    return user.verified ? <Outlet /> : <Navigate to="/verify" replace />;
  } else {
    return <Navigate to="/auth/login"/>;
  }
};

export default UserRoute;
