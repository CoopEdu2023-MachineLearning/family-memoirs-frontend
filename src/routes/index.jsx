import { Navigate } from 'react-router-dom';
import Layout from '@components/Layout/index.jsx';
import HomePage from "@pages/HomePage";
import TellerCreation from "@components/TellerCreation/index.jsx";
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
    path: '/demo',
    element: <TellerCreation/>
  }
];

export default routes;