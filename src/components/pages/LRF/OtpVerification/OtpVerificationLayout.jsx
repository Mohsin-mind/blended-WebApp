import PropTypes from 'prop-types';
import ImageSection from '../Login/ImageSection.jsx';
import webappLoginFrame from '@/assets/images/svg/user_login_image.png';
import teacherLoginFrame from '@/assets/images/svg/teacher_login_frame.png';
import ROLE from '@/utils/constant/role';

function OtpVerificationLayout({
  imageSrc,
  altText = 'OTP Verification',
  formComponent: FormComponent,
  formProps = {},
}) {
  // Select image based on role if not provided
  const role = formProps?.role || ROLE[0].value;
  const defaultImageSrc = role === ROLE[1].value ? teacherLoginFrame : webappLoginFrame;
  const finalImageSrc = imageSrc || defaultImageSrc;
  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
      {/* Left Column - OTP Form */}
      <div className='flex-1 w-full flex flex-col h-screen lg:h-screen relative'>
        <FormComponent {...formProps} />
      </div>

      {/* Right Column - Image */}
      <div className='flex-1 bg-blended-gray_4 h-64 lg:h-screen lg:w-auto'>
        <ImageSection imageSrc={finalImageSrc} altText={altText} />
      </div>
    </div>
  );
}

OtpVerificationLayout.propTypes = {
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
  formComponent: PropTypes.elementType.isRequired,
  formProps: PropTypes.object,
};

export default OtpVerificationLayout;
