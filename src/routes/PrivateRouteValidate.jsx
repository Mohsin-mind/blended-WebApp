import { isAuthenticated, getUserRole } from '@/services/apiService';
import { getDashboardUrl, getLoginPageUrl } from '@/utils/helper';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRouteValidate() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (!isAuthenticated()) {
    // Get user role to determine appropriate login page
    const userRole = getUserRole();
    const loginPageUrl = getLoginPageUrl(userRole);

    return <Navigate to={loginPageUrl} replace />;
  }

  // Role-based route protection
  const userRole = getUserRole();

  // Check if user is trying to access routes they shouldn't have access to
  if (userRole === 'STUDENT' && currentPath.startsWith('/teacher/')) {
    // Student trying to access teacher routes
    return <Navigate to={getDashboardUrl('STUDENT')} replace />;
  }

  if (userRole === 'TEACHER' && currentPath.startsWith('/student/')) {
    // Teacher trying to access student routes
    return <Navigate to={getDashboardUrl('TEACHER')} replace />;
  }

  return <Outlet />;
}
