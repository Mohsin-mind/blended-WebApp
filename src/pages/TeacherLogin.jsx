import { Fragment } from 'react';
import WebAppLoginLayout from '@/components/pages/LRF/Login/WebAppLoginLayout';
import LoginFormSection from '@/components/pages/LRF/Login/LoginFormSection';
import { loginSchema } from '@/schemas/loginSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { login as loginApi } from '@/services/authService';
import teacherLoginFrame from '@/assets/images/svg/teacher_login_frame.png';
import ROLE from '@/utils/constant/role';

export default function TeacherLogin() {
  const navigate = useNavigate();
  const { trigger } = useSWRMutation('/login', async (key, { arg }) => {
    return await loginApi(JSON.stringify(arg));
  });

  async function onSubmit(data) {
    const { meta } = await trigger(data);
    if (meta.code) {
      navigate('/dashboard', { replace: true });
    }
  }

  return (
    <ZodFormProvider schema={loginSchema} onSubmit={onSubmit}>
      <WebAppLoginLayout 
        formComponent={LoginFormSection}
        formProps={{
          toggleOptions: [{ label: 'LOGIN', value: 'login' }],
          signupText: "Request Access",
          role: ROLE[1].value // Teacher role (value: '2')
        }}
        imageSrc={teacherLoginFrame}
        altText="Teacher Login"
      />
    </ZodFormProvider>
  );
}
