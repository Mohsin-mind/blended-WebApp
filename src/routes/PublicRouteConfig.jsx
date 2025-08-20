import StudentLogin from '@/pages/StudentLogin';
import TeacherLogin from '@/pages/TeacherLogin';
import PublicRouteValidate from './PublicRouteValidate';
import OtpVerification from '@/pages/OtpVerification';
import EmailVerification from '@/pages/EmailVerification';
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
        element: <Navigate to='/student/login' replace />,
      },
      {
        path: '/student/login',
        title: 'Student Login',
        element: <StudentLogin />,
      },
      {
        path: '/teacher/login',
        title: 'Teacher Login',
        element: <TeacherLogin />,
      },
      // Role-based forgot password routes
      {
        path: '/student/forgot-password',
        title: 'Student Forgot Password',
        element: <ForgotPassword />,
      },
      {
        path: '/teacher/forgot-password',
        title: 'Teacher Forgot Password',
        element: <ForgotPassword />,
      },
      // Role-based reset password routes
      {
        path: 'student/reset-password',
        title: 'Student Reset Password',
        element: <ResetPassword />,
      },
      {
        path: 'teacher/reset-password',
        title: 'Teacher Reset Password',
        element: <ResetPassword />,
      },
      {
        path: 'teacher/otp-verification',
        title: 'OTP Verification',
        element: <OtpVerification />,
      },
      {
        path: 'student/verify-email',
        title: 'Email Verification',
        element: <EmailVerification />,
      },
      {
        path: 'teacher/verify-email',
        title: 'Email Verification',
        element: <EmailVerification />,
      },

      // Add more public routes here
    ],
  },
];

export default PUBLIC_ROUTE_CONFIG;
