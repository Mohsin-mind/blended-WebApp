import PropTypes from 'prop-types';

function ErrorHeader({ title, message }) {
  return (
    <>
      <h1 className='text-4xl font-extrabold mb-2 text-gold dark:text-dark-gold font-display'>
        {title}
      </h1>
      <p className='mb-6 text-lg font-medium text-grayDark dark:text-dark-grayDark max-w-md'>
        {message}
      </p>
    </>
  );
}

ErrorHeader.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorHeader;
