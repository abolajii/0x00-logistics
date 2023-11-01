import { Navigate, Outlet } from "react-router-dom";

import { useLogin } from "../pages/login/hook/useLogin";

export const PrivateRoute = () => {
  const { loggedInUser } = useLogin();

  if (loggedInUser && loggedInUser.username) {
    // If a user is authenticated, allow access
    return <Outlet />;
  } else {
    // Redirect to the login page
    return <Navigate to="/login" />;
  }
};

export const PublicRoute = () => {
  const { loggedInUser } = useLogin();

  if (loggedInUser && loggedInUser.username) {
    // If a user is authenticated, redirect to the dashboard
    return <Navigate to="/dashboard" />;
  } else {
    // Allow access to the public route
    return <Outlet />;
  }
};
