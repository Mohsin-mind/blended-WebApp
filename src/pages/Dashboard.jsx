export default function Dashboard() {
  return (
    <div className='p-6 space-y-6 flex flex-col justify-center items-center bg-grayLight dark:bg-dark-grayLight font-sans min-h-full'>
      <h2 className='text-3xl font-bold text-black dark:text-dark-black font-heading'>
        Dashboard
      </h2>
      <p className='text-grayDark dark:text-dark-grayDark text-center'>
        Welcome to your Dashboard! The development environment is currently in
        progress
      </p>
    </div>
  );
}
