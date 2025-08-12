import PropTypes from 'prop-types';

function ErrorField({ label, value, isCode = false }) {
  return (
    <div>
      <span className='font-medium text-gray-700 dark:text-gray-300'>
        {label}:{' '}
      </span>
      {isCode ? (
        <pre className='mt-1 p-2 bg-gray-200 dark:bg-gray-700 rounded text-xs overflow-auto max-h-40 text-gray-800 dark:text-gray-200'>
          {value}
        </pre>
      ) : (
        <span className='text-red-600 dark:text-red-400'>{value}</span>
      )}
    </div>
  );
}

ErrorField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isCode: PropTypes.bool,
};

export default ErrorField;
