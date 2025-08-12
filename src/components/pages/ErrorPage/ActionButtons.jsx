import { Link } from 'react-router-dom';

function ActionButtons() {
  return (
    <div className='flex flex-col sm:flex-row gap-4 mb-6'>
      <Link
        to='/'
        className='px-6 py-3 bg-gold dark:bg-dark-gold hover:bg-goldLight dark:hover:bg-dark-goldLight text-white dark:text-dark-white rounded-lg font-semibold transition-colors'
      >
        Return to Home
      </Link>
      <button
        onClick={() => window.location.reload()}
        className='px-6 py-3 bg-blue dark:bg-blue hover:bg-gray-700 dark:hover:bg-gray-400 text-white rounded-lg font-semibold transition-colors'
      >
        Reload Page
      </button>
    </div>
  );
}

export default ActionButtons;
