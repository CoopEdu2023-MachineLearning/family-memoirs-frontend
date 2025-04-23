import './App.css'
import routes from '@routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";
import { Empty } from '@douyinfe/semi-ui';

const App = () => {
  const router = createBrowserRouter(routes);
  return (
    <ErrorBoundary fallback={<Empty title={'Something went wrong'} />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
