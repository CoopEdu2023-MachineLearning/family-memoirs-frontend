import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const PrivateProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    isAuthenticated
      ? <Outlet />
      : <Navigate to="/home" replace /> // 重定向到home页面而不是login页面
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