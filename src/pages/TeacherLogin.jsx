import WebAppLoginLayout from '@/components/pages/LRF/Login/WebAppLoginLayout';
import LoginFormSection from '@/components/pages/LRF/Login/LoginFormSection';
import { loginSchema } from '@/schemas/loginSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { login as loginApi } from '@/services/authService';
import teacherLoginFrame from '@/assets/images/svg/teacher_login_frame.png';
import ROLE from '@/utils/constant/role';
import { showToast } from '@/lib/toast';
import { setCookie } from '@/utils/helper';

export default function TeacherLogin() {
  const navigate = useNavigate();
  const { trigger } = useSWRMutation('/login', async (key, { arg }) => {
    return await loginApi(JSON.stringify(arg), false);
  });

  async function onSubmit(data) {
    const { meta, data: responseData } = await trigger(data);
    if (meta?.code && responseData?.token) {
      // Validate that the user is actually a teacher
      if (responseData.user?.role !== 'TEACHER') {
        showToast(
          'error',
          'This login page is for teachers only. Please use the student login page.'
        );
        return;
      }

      setCookie('teacher_token', responseData?.token);
      setCookie('teacher_detail', JSON.stringify(responseData));
      navigate('/teacher/dashboard', { replace: true });
      showToast(meta?.code ? 'success' : 'error', meta?.message);
    } else {
      showToast('error', 'Invalid credentials');
    }
  }

  return (
    <ZodFormProvider schema={loginSchema} onSubmit={onSubmit}>
      <WebAppLoginLayout
        formComponent={LoginFormSection}
        formProps={{
          toggleOptions: [{ label: 'LOGIN', value: 'login' }],
          signupText: 'Request Access',
          role: ROLE[1].value, // Teacher role (value: '2')
        }}
        imageSrc={teacherLoginFrame}
        altText='Teacher Login'
        activeForm='login'
      />
    </ZodFormProvider>
  );
}
