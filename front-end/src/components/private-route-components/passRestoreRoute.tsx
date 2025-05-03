//this is private route component for verify route

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PassRestoreRouteProps } from "../../types/privateRoutes/passRestoreRoute";

const PassRestoreRoute: React.FC<PassRestoreRouteProps> = ({ user }) => {
  return <Outlet />;
};

export default PassRestoreRoute;
