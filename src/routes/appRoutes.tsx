import { createBrowserRouter } from 'react-router-dom';
import { Dashboard, Login } from '../pages';
import { Error } from '@/pages/Error';

export const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/error',
    element: <Error />,
  },
  {
    path: '*',
    element: <Error />,
  },
]);
