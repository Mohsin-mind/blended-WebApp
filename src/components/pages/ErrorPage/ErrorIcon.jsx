import PropTypes from 'prop-types';

function getErrorIcon(statusCode) {
  const icons = {
    404: '🔍',
    403: '🚫',
    401: '🔐',
  };
  return icons[statusCode] || '⚠️';
}

function ErrorIcon({ statusCode }) {
  return <div className='text-6xl mb-4'>{getErrorIcon(statusCode)}</div>;
}

ErrorIcon.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default ErrorIcon;
