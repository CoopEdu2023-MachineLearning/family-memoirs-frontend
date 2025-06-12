import React from 'react';
import { Navigate } from 'react-router-dom';
import { PublicProtectedRoute } from './ProtectedRoutes';
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
    path: '/mypage/article/upload',
    element: <UploadArticlePage name='upload' />
  },
];

export default routes;