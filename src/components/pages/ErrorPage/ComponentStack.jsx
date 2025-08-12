import PropTypes from 'prop-types';
import ErrorField from './ErrorField';

function ComponentStack({ error }) {
  if (!error?.componentStack) return null;

  return (
    <ErrorField label='Component Stack' value={error.componentStack} isCode />
  );
}

ComponentStack.propTypes = {
  error: PropTypes.shape({
    componentStack: PropTypes.string,
  }),
};

export default ComponentStack;
