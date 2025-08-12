import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center bg-grayLight dark:bg-dark-grayLight text-black dark:text-black font-sans'>
      <h1 className='text-4xl md:text-5xl font-extrabold mb-4 text-gold dark:text-gold'>
        404 - Page Not Found
      </h1>
      <p className='mb-4 text-lg text-grayDark dark:text-grayDark'>
        The page you are looking for does not exist.
      </p>
      <Link
        to='/'
        replace
        className='text-white dark:text-white bg-gold dark:bg-gold hover:bg-goldLight dark:hover:bg-goldLight px-6 py-2 rounded font-medium transition-colors'
      >
        Go back to Home
      </Link>
    </div>
  );
}
