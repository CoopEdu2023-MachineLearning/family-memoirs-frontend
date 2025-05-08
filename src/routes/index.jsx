import { Navigate } from 'react-router-dom';
import { PrivateProtectedRoute, PublicProtectedRoute } from './ProtectedRoutes';
import LoginPage from '@pages/LoginPage';
import UploadArticlePage from '../pages/UploadArticlePage';

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
      { path: '/login', element: <LoginPage name='login' /> }
    ]
  },
  {
    path: '/mypage/article/upload',
    element: <UploadArticlePage name='upload' />
  },
  {
    path: '/demo',
    element: <LoginPage name='demo' />
  },
];

export default routes;