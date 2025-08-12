import PropTypes from 'prop-types';
import ErrorField from './ErrorField';

function ErrorType({ error }) {
  return (
    <ErrorField
      label='Error Type'
      value={error?.constructor?.name || 'Unknown'}
    />
  );
}
ErrorType.propTypes = {
  error: PropTypes.shape({
    constructor: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default ErrorType;
