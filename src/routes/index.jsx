import { Navigate } from 'react-router-dom';
import { PrivateProtectedRoute, PublicProtectedRoute } from './ProtectedRoutes';
import HomePage from "@pages/HomePage";
import TellerCreation from "@components/TellerCreation/index.jsx";


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
    path: '/demo',
    element: <>
      <TellerCreation/>
    </>
  },
  {

  }
];

export default routes;