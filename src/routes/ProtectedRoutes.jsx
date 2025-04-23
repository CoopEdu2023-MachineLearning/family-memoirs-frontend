import { Navigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';

export const PrivateProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    isAuthenticated
      ? <Outlet />
      : <Navigate to="/login" replace />
  );
};

export const PublicProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    isAuthenticated
      ? <Navigate to="/home" replace />
      : <Outlet />
  );
};