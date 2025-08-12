import PropTypes from 'prop-types';

function InputError({ message, show }) {
  if (show || !message) return null;
  return <p className='text-sm text-red mt-1 font-poppins'>{message}</p>;
}
InputError.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
};

export default InputError;
