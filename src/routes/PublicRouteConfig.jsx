import StudentLogin from '@/pages/StudentLogin';
import TeacherLogin from '@/pages/TeacherLogin';
import PublicRouteValidate from './PublicRouteValidate';
import OtpVerification from '@/pages/OtpVerification';
import { Navigate } from 'react-router-dom';
import ResetPassword from '@/pages/ResetPassword';
import ForgotPassword from '@/pages/ForgotPassword';

const PUBLIC_ROUTE_CONFIG = [
  {
    element: <PublicRouteValidate />,
    children: [
      {
        path: '/',
        title: 'Student Login',
        element: <Navigate to='/student-login' replace />,
      },
      {
        path: '/student-login',
        title: 'Student Login',
        element: <StudentLogin />,
      },
      {
        path: '/teacher-login',
        title: 'Teacher Login',
        element: <TeacherLogin />,
      },
      {
        path: '/forgot-password',
        title: 'Forgot Password',
        element: <ForgotPassword />,
      },
      {
        path: '/otp-verification',
        title: 'OTP Verification',
        element: <OtpVerification />,
      },
      {
        path: '/reset-password',
        title: 'Reset Password',
        element: <ResetPassword />,
      },

      // Add more public routes here
    ],
  },
];

export default PUBLIC_ROUTE_CONFIG;
