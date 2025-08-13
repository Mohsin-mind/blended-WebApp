import { useLocation } from 'react-router-dom';
import WebAppLoginLayout from '@/components/pages/LRF/Login/WebAppLoginLayout';
import ForgotPasswordForm from '@/components/pages/LRF/ForgotPassword/ForgotPasswordForm';
import { forgotPasswordSchema } from '@/schemas/forgotPasswordSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import ROLE from '@/utils/constant/role';
import studentLoginFrame from '@/assets/images/svg/user_login_image.png';
import teacherLoginFrame from '@/assets/images/svg/teacher_login_frame.png';

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get role from location state, default to student
  const role = location.state?.role || ROLE[0].value;
  
  // Select image based on role
  const imageSrc = role === ROLE[1].value ? teacherLoginFrame : studentLoginFrame;
  const altText = role === ROLE[1].value ? 'Teacher Forgot Password' : 'Student Forgot Password';

  const { trigger } = useSWRMutation('/forgot-password', async (key, { arg }) => {
    // TODO: Implement forgot password API call
    console.log('Forgot password data:', arg);
    return { success: true };
  });

  async function onSubmit(data) {
    try {
      const result = await trigger(data);
      if (result.success) {
        // Navigate to OTP verification with role context
        navigate('/otp-verification', { 
          state: { 
            role,
            email: data.email 
          } 
        });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  }

  return (
    <ZodFormProvider schema={forgotPasswordSchema} onSubmit={onSubmit}>
      <WebAppLoginLayout 
        formComponent={ForgotPasswordForm}
        formProps={{ role }}
        imageSrc={imageSrc}
        altText={altText}
      />
    </ZodFormProvider>
  );
}
