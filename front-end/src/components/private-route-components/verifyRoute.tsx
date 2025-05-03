//this is private route component for verify route

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { VerifyRouteProps } from "../../types/privateRoutes/verifyRoute";

const VerifyRoute: React.FC<VerifyRouteProps> = ({ user }) => {
  if (user) {
    return !user.verified ? <Outlet /> : <Navigate to="/user" replace />;
  } else {
    return <Navigate to="/" />;
  }
};

export default VerifyRoute;
