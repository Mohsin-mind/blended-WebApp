import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import ManageUsers from '@/pages/ManageUsers';
import PrivateRouteValidate from './PrivateRouteValidate';
import ChangePassword from '@/pages/ChangePassword';
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

const PRIVATE_ROUTE_CONFIG = [
  {
    element: <PrivateRouteValidate />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/dashboard',
            title: 'Dashboard',
            icon: dashboardIcon,
            section: 'Main Menu',
            isMainLayout: true,
            element: <Dashboard />,
          },
          {
            path: '/cms',
            title: 'CMS Management',
            icon: cmsIcon,
            section: 'Main Menu',
            isMainLayout: true,
            element: <div>CMS Management Page</div>,
          },
          {
            path: '/users',
            title: 'User Management',
            icon: userIcon,
            section: 'Main Menu',
            isMainLayout: true,
            element: <div>User Management Page</div>,
          },
          {
            path: '/courses',
            title: 'Course Management',
            icon: courseIcon,
            section: 'Main Menu',
            isMainLayout: true,
            element: <div>Course Management Page</div>,
          },
          {
            path: '/roles',
            title: 'Role Management',
            icon: roleIcon,
            section: 'Main Menu',
            isMainLayout: true,
            element: <div>Role Management Page</div>,
          },
          {
            path: '/pricing',
            title: 'Pricing Plans',
            icon: pricingIcon,
            section: 'Main Menu',
            isMainLayout: true,
            element: <div>Pricing Plans Page</div>,
          },
          {
            path: '/transactions',
            title: 'Transaction History',
            icon: transactionIcon,
            section: 'Main Menu',
            isMainLayout: true,
            element: <div>Transaction History Page</div>,
          },
          {
            path: '/chat',
            title: 'Chat Threads',
            icon: chatIcon,
            section: 'Communication',
            isMainLayout: true,
            element: <div>Chat Threads Page</div>,
          },
          {
            path: '/schedule',
            title: 'My Schedule',
            icon: scheduleIcon,
            section: 'Communication',
            isMainLayout: true,
            element: <div>My Schedule Page</div>,
          },
          {
            path: '/help',
            title: 'Help & Resources',
            icon: helpIcon,
            section: 'Settings & Support',
            isMainLayout: true,
            element: <div>Help & Resources Page</div>,
          },
          {
            path: '/settings',
            title: 'Settings',
            icon: settingsIcon,
            section: 'Settings & Support',
            isMainLayout: true,
            element: <div>Settings Page</div>,
          },
          {
            path: '/manage-users',
            title: 'Manage Users',
            isMainLayout: true,
            element: <ManageUsers />,
          },
          {
            path: '/change-password',
            title: 'Change Password',
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
];

export default PRIVATE_ROUTE_CONFIG;
