import PropTypes from 'prop-types';
import ImageSection from '../Login/ImageSection.jsx';
import webappLoginFrame from '@/assets/images/svg/student_login_frame.png';
import teacherLoginFrame from '@/assets/images/svg/teacher_login_frame.png';
import ROLE from '@/utils/constant/role';

function ResetPasswordLayout({
  imageSrc,
  altText = 'Reset Password',
  formComponent: FormComponent,
  formProps = {},
}) {
  // Select image based on role if not provided
  const role = formProps?.role || ROLE[0].value;
  const defaultImageSrc =
    role === ROLE[1].value ? teacherLoginFrame : webappLoginFrame;
  const finalImageSrc = imageSrc || defaultImageSrc;

  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
      {/* Left Column - Reset Password Form */}
      <div className='flex-1 w-full flex flex-col h-screen lg:h-screen relative'>
        <FormComponent {...formProps} />
      </div>

      {/* Right Column - Image */}
      <div className='flex-1 bg-blended-gray_4 h-64 lg:h-screen lg:w-auto'>
        <ImageSection
          imageSrc={finalImageSrc}
          altText={altText}
          title='Welcome Back, Dhruvin Dave'
          subtitle="Explore live courses led by MIT faculty. We'll guide you in selecting your ideal starting point—whether it's building foundations or diving into hands-on projects."
          titleClass='text-left'
          subtitleClass='text-left'
        />
      </div>
    </div>
  );
}

ResetPasswordLayout.propTypes = {
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
  formComponent: PropTypes.elementType.isRequired,
  formProps: PropTypes.object,
};

export default ResetPasswordLayout;
