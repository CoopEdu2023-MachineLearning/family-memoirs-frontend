import './App.css'
import routes from '@routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";
import { Empty } from "antd";

const App = () => {
  const router = createBrowserRouter(routes);
  return (
    <ErrorBoundary fallback={<Empty description='Something went wrong' />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
