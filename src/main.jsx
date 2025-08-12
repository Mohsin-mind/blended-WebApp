import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import ErrorBoundary from './ErrorBoundary';
import './index.css';
import '@/assets/css/iconfonts.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);
