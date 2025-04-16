//this is private route component for auth route

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthRouteProps } from "../../types/privateRoutes/authRoute";

const AuthRoute: React.FC<AuthRouteProps> = ({ user }) => {
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoute;
