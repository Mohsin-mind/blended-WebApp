import { isAuthenticated, getUserRole } from '@/services/apiService';
import { getDashboardUrl } from '@/utils/helper';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PublicRouteValidate() {
  const location = useLocation();
  const currentPath = location.pathname;
  // Routes that should always be accessible (even when authenticated)
  const alwaysAccessibleRoutes = [
    '/student/forgot-password',
    '/student/reset-password',
    '/student/otp-verification',
    '/student/verify-email',
    '/teacher/forgot-password',
    '/teacher/reset-password',
    '/teacher/otp-verification',
    '/teacher/verify-email',
  ];

  // Check if current route is always accessible
  const isAlwaysAccessible = alwaysAccessibleRoutes.some(route =>
    currentPath.startsWith(route)
  );

  // If route is always accessible, allow access regardless of auth status
  if (isAlwaysAccessible) {
    return <Outlet />;
  }

  // For other public routes, redirect authenticated users to their dashboard
  if (isAuthenticated()) {
    const userRole = getUserRole();
    const dashboardUrl = getDashboardUrl(userRole);
    return <Navigate to={dashboardUrl} replace />;
  }

  return <Outlet />;
}
