import { Navigate } from 'react-router-dom';
import { PrivateProtectedRoute, PublicProtectedRoute } from './ProtectedRoutes';
import DemoPage from '@pages/DemoPage';
import WaterfallPage from '../pages/WaterfallPage';
import HomePage from "@pages/HomePage";
import TellerCreation from "@components/TellerCreation/index.jsx";

const routes = [
  {
    index: true,
    element: <Navigate to='/home' replace />,
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    element: <PrivateProtectedRoute />,
    children: [
      // 这里放需要登录才能访问的页面
      // 例如：个人中心、设置页面等
    ]
  },
  {
    path: '/home',
    element: <DemoPage name='home' />
  },
  {
    path: '/demo',
    element: <>
      <TellerCreation/>
    </>
  },
  {
    path: '/waterfall',
    element: <WaterfallPage/>
  },
];

export default routes;