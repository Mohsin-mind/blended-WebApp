import { isAuthenticated } from '@/services/authService';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRouteValidate() {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' replace />;
}
