import { Navigate } from 'react-router-dom';
import { PrivateProtectedRoute, PublicProtectedRoute } from './ProtectedRoutes';
import DemoPage from '@pages/DemoPage';
import LoginPage from '@pages/LoginPage';

const routes = [
  {
    element: <PrivateProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to='/home' replace />,
      },
    ]
  },
  {
    element: <PublicProtectedRoute />,
    children: [
      { path: '/login', element: <LoginPage /> }
    ]
  },
  {
    path: '/home',
    element: <DemoPage name='home' />
  },
  {
    path: '/demo',
    element: <DemoPage name='demo' />
  },
];

export default routes;