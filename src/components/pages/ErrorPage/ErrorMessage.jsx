import PropTypes from 'prop-types';
import ErrorField from './ErrorField';

function ErrorMessage({ error }) {
  return (
    <ErrorField
      label='Message'
      value={error?.message || 'No message available'}
    />
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default ErrorMessage;
