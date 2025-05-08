import React from 'react';
import { Navigate } from 'react-router-dom';
import { PrivateProtectedRoute, PublicProtectedRoute } from './ProtectedRoutes';
import DemoPage from '@pages/DemoPage';
import ArticlePage from '@pages/ArticlePage';

const routes = [
  {
    element: <PrivateProtectedRoute />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> }
    ]
  },
  {
    element: <PublicProtectedRoute />,
    children: [
      { path: '/login', element: <DemoPage name="login" /> }
    ]
  },
  { path: '/home', element: <DemoPage name="home" /> },
  { path: '/demo', element: <DemoPage name="demo" /> },
  { path: '/article/:id', element: <ArticlePage /> }
];

export default routes;