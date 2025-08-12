import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import ErrorPage from '@/pages/ErrorPage';
import NotFound from '@/pages/NotFound';
import PUBLIC_ROUTE_CONFIG from './PublicRouteConfig';
import PRIVATE_ROUTE_CONFIG from './PrivateRouteConfig';

export const ROUTES = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      ...PUBLIC_ROUTE_CONFIG,
      ...PRIVATE_ROUTE_CONFIG,
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export const router = createBrowserRouter(ROUTES);
