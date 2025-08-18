import { useLocation } from 'react-router-dom';
import ForgotPasswordLayout from '@/components/pages/LRF/ForgotPassword/ForgotPasswordLayout';
import ForgotPasswordForm from '@/components/pages/LRF/ForgotPassword/ForgotPasswordForm';
import { forgotPasswordSchema } from '@/schemas/forgotPasswordSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { forgotPassword as forgotPasswordApi } from '@/services/authService';
import ROLE from '@/utils/constant/role';
import studentLoginFrame from '@/assets/images/svg/student_login_frame.png';
import teacherLoginFrame from '@/assets/images/svg/teacher_login_frame.png';
import { showToast } from '@/lib/toast';

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get role from location state, default to student
  const role = location.state?.role || ROLE[0].value;

  // Select image based on role
  const imageSrc =
    role === ROLE[1].value ? teacherLoginFrame : studentLoginFrame;
  const altText =
    role === ROLE[1].value
      ? 'Teacher Forgot Password'
      : 'Student Forgot Password';

  const { trigger } = useSWRMutation(
    '/forgot-password',
    async (key, { arg }) => {
      return await forgotPasswordApi(JSON.stringify(arg));
    }
  );

  async function onSubmit(data) {
    try {
      const { meta } = await trigger(data);
      if (meta?.code) {
        navigate('/otp-verification', {
          replace: true,
          state: {
            role,
            email: data.email,
          },
        });
      }
    } catch (error) {
      if (error) {
        showToast('error', 'Failed to send OTP. Please try again.');
      }
    }
  }

  return (
    <ZodFormProvider schema={forgotPasswordSchema} onSubmit={onSubmit}>
      <ForgotPasswordLayout
        formComponent={ForgotPasswordForm}
        formProps={{ role }}
        imageSrc={imageSrc}
        altText={altText}
      />
    </ZodFormProvider>
  );
}
