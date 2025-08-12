import PropTypes from 'prop-types';
import ErrorType from './ErrorType';
import ErrorMessage from './ErrorMessage';
import StackTrace from './StackTrace';
import ComponentStack from './ComponentStack';

function ErrorDetails({ error }) {
  const isDev = import.meta.env.MODE === 'development';

  if (!isDev) return null;

  return (
    <div className='mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left max-w-2xl'>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
        Debug Information
      </h3>
      <div className='space-y-2 text-sm'>
        <ErrorType error={error} />
        <ErrorMessage error={error} />
        <StackTrace error={error} />
        <ComponentStack error={error} />
      </div>
    </div>
  );
}

ErrorDetails.propTypes = {
  error: PropTypes.object,
};

export default ErrorDetails;
