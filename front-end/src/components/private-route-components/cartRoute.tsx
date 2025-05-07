//this is private route component for cart route

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CartRouteProps } from "../../types/privateRoutes/cartRoute";

const CartRoute: React.FC<CartRouteProps> = ({ user }) => {
  if (user) {
    return user.verified ? <Outlet /> : <Navigate to="/verify" replace />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default CartRoute;
