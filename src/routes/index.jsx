import React from 'react';
import { Navigate } from 'react-router-dom';
import { PrivateProtectedRoute, PublicProtectedRoute } from './ProtectedRoutes';
import DemoPage from '@pages/DemoPage';
import ArticlePage from '@pages/ArticlePage';

const routes = [
  // 私有路由（需要登录）
  {
    element: <PrivateProtectedRoute />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> }
    ]
  },
  // 公共路由（登录后重定向）
  {
    element: <PublicProtectedRoute />,
    children: [
      { path: '/login', element: <DemoPage name="login" /> }
    ]
  },
  // 普通页面
  { path: '/home', element: <DemoPage name="home" /> },
  { path: '/demo', element: <DemoPage name="demo" /> },
  // 文章详情页
  { path: '/article/:id', element: <ArticlePage /> }
];

export default routes;