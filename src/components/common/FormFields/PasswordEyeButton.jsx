import CloseEye from '@/assets/images/svg/close_eye.svg';
import Eye from '@/assets/images/svg/eye.svg';
import PropTypes from 'prop-types';

function PasswordEyeButton({ type, isShow, setIsShow }) {
  if (type !== 'password') return null;

  return (
    <button
      type='button'
      onClick={() => setIsShow(prev => !prev)}
      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
      aria-label={`${isShow ? 'Hide' : 'Show'} password`}
    >
      <img
        src={isShow ? CloseEye : Eye}
        alt={`${isShow ? 'Hide' : 'Show'} password`}
        className='w-5 h-5'
      />
    </button>
  );
}

PasswordEyeButton.propTypes = {
  type: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
};

export default PasswordEyeButton;
