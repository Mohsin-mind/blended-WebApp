import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import ManageUsers from '@/pages/ManageUsers';
import PrivateRouteValidate from './PrivateRouteValidate';
import ChangePassword from '@/pages/ChangePassword';
import { Navigate } from 'react-router-dom';
import { getUserRole, getDashboardUrl } from '@/services/authService';
import dashboardIcon from '@/assets/images/svg/dashboard.svg';
import cmsIcon from '@/assets/images/svg/database-management.svg';
import userIcon from '@/assets/images/svg/users-gear.svg';
import courseIcon from '@/assets/images/svg/e-learning.svg';
import roleIcon from '@/assets/images/svg/users-gear.svg';
import pricingIcon from '@/assets/images/svg/tags.svg';
import transactionIcon from '@/assets/images/svg/receipt.svg';
import chatIcon from '@/assets/images/svg/Letter.svg';
import scheduleIcon from '@/assets/images/svg/calendar-day.svg';
import helpIcon from '@/assets/images/svg/info.svg';
import settingsIcon from '@/assets/images/svg/settings.svg';

// Component to redirect legacy dashboard to role-based dashboard
const DashboardRedirect = () => {
  const userRole = getUserRole();
  if (userRole === 'STUDENT') {
    return <Navigate to={getDashboardUrl('STUDENT')} replace />;
  } else if (userRole === 'TEACHER') {
    return <Navigate to={getDashboardUrl('TEACHER')} replace />;
  }
  return <Navigate to="/student/login" replace />;
};

// Student routes - based on the student sidebar image
const STUDENT_ROUTES = [
  {
    path: '/student/dashboard',
    title: 'Dashboard',
    icon: dashboardIcon,
    section: 'Learning Hub',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/spoc',
    title: 'SPOC',
    icon: courseIcon,
    section: 'Learning Hub',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/online-pbl',
    title: 'Online PBL',
    icon: courseIcon,
    section: 'Learning Hub',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/my-outcomes',
    title: 'My Outcomes',
    icon: helpIcon,
    section: 'My Progress',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/bookmarked-courses',
    title: 'Bookmarked Courses',
    icon: courseIcon,
    section: 'My Progress',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/ai-learning-plans',
    title: 'AI+X Learning Plans',
    icon: courseIcon,
    section: 'My Progress',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/my-schedule',
    title: 'My Schedule',
    icon: scheduleIcon,
    section: 'My Progress',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/my-chats',
    title: 'My Chats',
    icon: chatIcon,
    section: 'Collaboration & Support',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/apply-leave',
    title: 'Apply for Leave',
    icon: helpIcon,
    section: 'Collaboration & Support',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/my-files',
    title: 'My Files',
    icon: helpIcon,
    section: 'Collaboration & Support',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/settings',
    title: 'Settings',
    icon: settingsIcon,
    section: 'System Preferences',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/student/change-password',
    title: 'Change Password',
    element: <ChangePassword />,
  },
];

// Teacher routes - based on the teacher sidebar image
const TEACHER_ROUTES = [
  {
    path: '/teacher/dashboard',
    title: 'Dashboard',
    icon: dashboardIcon,
    section: 'Main Menu',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/teacher/my-courses',
    title: 'My Courses',
    icon: courseIcon,
    section: 'Main Menu',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/teacher/cohorts-groups',
    title: 'Cohorts & Groups',
    icon: userIcon,
    section: 'Main Menu',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/teacher/my-schedule',
    title: 'My Schedule',
    icon: scheduleIcon,
    section: 'Main Menu',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/teacher/chat-threads',
    title: 'Chat Threads',
    icon: chatIcon,
    section: 'Communication',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/teacher/help',
    title: 'Help & Resources',
    icon: helpIcon,
    section: 'Settings & Support',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/teacher/settings',
    title: 'Settings',
    icon: settingsIcon,
    section: 'Settings & Support',
    isMainLayout: true,
    element: <Dashboard />,
  },
  {
    path: '/teacher/change-password',
    title: 'Change Password',
    element: <ChangePassword />,
  },
];

const PRIVATE_ROUTE_CONFIG = [
  {
    element: <PrivateRouteValidate />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // Student routes
          ...STUDENT_ROUTES,
          // Teacher routes
          ...TEACHER_ROUTES,
        ],
      },
    ],
  },
];

export default PRIVATE_ROUTE_CONFIG;
