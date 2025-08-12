import ErrorField from './ErrorField';
import PropTypes from 'prop-types';

function StackTrace({ error }) {
  if (!error?.stack) return null;

  return <ErrorField label='Stack Trace' value={error.stack} isCode />;
}

StackTrace.propTypes = {
  error: PropTypes.shape({
    stack: PropTypes.string,
  }),
};

export default StackTrace;
