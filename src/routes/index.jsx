import React from 'react';
import { Navigate } from 'react-router-dom';
import { PublicProtectedRoute } from './ProtectedRoutes';
import LoginPage from '@pages/LoginPage';
import UploadArticlePage from '../pages/UploadArticlePage';
import Layout from '@components/Layout/index.jsx';
import HomePage from "@pages/HomePage";
import WaterfallPage from "@pages/WaterfallPage/index.jsx";
import { SearchResultsPage } from "@pages/SearchResultsPage";

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
      },
      {
        path: '/search',
        element: <SearchResultsPage />
      }
    ]
  },
  {
    element: <PublicProtectedRoute />,
    children: [
<<<<<<< HEAD
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
=======
      { path: '/login', element: <DemoPage name="login" /> }
    ]
  },
  { path: '/home', element: <DemoPage name="home" /> },
  { path: '/demo', element: <DemoPage name="demo" /> },
  { path: '/article/:id', element: <ArticlePage /> }
>>>>>>> 6269ec13b8c37fc908565863160788de42a213ff
];

export default routes;