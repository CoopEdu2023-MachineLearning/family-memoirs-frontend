import { Navigate } from 'react-router-dom';
import { PrivateProtectedRoute, PublicProtectedRoute } from './ProtectedRoutes';
import DemoPage from '@pages/DemoPage';
import LoginPage from '@pages/LoginPage';
import HomePage from "@pages/HomePage";

const routes = [
  {
    element: <PrivateProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to='/home' replace />,
      },
      {
        path: '/home',
        element: <HomePage />
      },
    ]
  },
  {
    element: <PublicProtectedRoute />,
    children: [
      { path: '/login', element: <LoginPage page={"login"}/> },
      { path: '/register', element: <LoginPage page={"register"}/>},
      { path: '/forget', element: <LoginPage page={"forget"}/>},
    ]
  },
  {
    path: '/demo',
    element: <DemoPage name='demo' />
  },
];

export default routes;