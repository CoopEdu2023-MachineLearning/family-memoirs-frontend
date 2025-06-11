import { Navigate } from 'react-router-dom';
import { PublicProtectedRoute } from './ProtectedRoutes';
import LoginPage from '@pages/LoginPage';
import UploadArticlePage from '../pages/UploadArticlePage';
import Layout from '@components/Layout/index.jsx';
import HomePage from "@pages/HomePage";
import WaterfallPage from "@pages/WaterfallPage/index.jsx";

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to='/home' replace />,
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/homeWaterfall',
        element: <WaterfallPage />
      }
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