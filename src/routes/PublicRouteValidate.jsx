import { isAuthenticated } from '@/services/authService';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRouteValidate() {
  return !isAuthenticated() ? <Outlet /> : <Navigate to='/dashboard' replace />;
}
