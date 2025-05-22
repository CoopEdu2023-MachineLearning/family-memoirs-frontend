import { Navigate } from 'react-router-dom';
import { PrivateProtectedRoute, PublicProtectedRoute } from './ProtectedRoutes';
import DemoPage from '@pages/DemoPage';
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
    ]
  },
  {
    element: <PublicProtectedRoute />,
    children: [
      { path: '/login', element: <DemoPage name='login' /> }
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