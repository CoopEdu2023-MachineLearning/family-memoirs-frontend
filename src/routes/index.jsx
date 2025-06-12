import { Navigate } from 'react-router-dom';
import Layout from '@components/Layout/index.jsx';
import HomePage from "@pages/HomePage";
import TellerCreation from "@components/TellerCreation/index.jsx";
import WaterfallPage from "@pages/WaterfallPage/index.jsx";
import MyPage from "@pages/MyPage/index.jsx";

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
        path: '/my',
        element: <MyPage />
      }
    ]
  },
  {
    path: '/demo',
    element: <TellerCreation/>
  }
];

export default routes;