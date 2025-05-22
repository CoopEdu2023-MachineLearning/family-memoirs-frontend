import { Navigate } from 'react-router-dom';
import { PrivateProtectedRoute, PublicProtectedRoute } from './ProtectedRoutes';
import DemoPage from '@pages/DemoPage';
import LoginPage from '@pages/LoginPage';
import HomePage from "@pages/HomePage";

import signUp from "@pages/SignUpPage/SignUp.jsx";
import SignUp from "@pages/SignUpPage/SignUp.jsx";
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
    path: '/home',
    element: <DemoPage name='home' />
  },
  {
    path: '/demo',
    element: <DemoPage name='demo' />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
];

export default routes;