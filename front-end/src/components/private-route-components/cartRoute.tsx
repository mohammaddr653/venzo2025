//this is private route component for cart route

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const CartRoute: React.FC = () => {
  return <Outlet />;
};

export default CartRoute;
