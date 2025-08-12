import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import ErrorIcon from '@/components/pages/ErrorPage/ErrorIcon';
import ErrorHeader from '@/components/pages/ErrorPage/ErrorHeader';
import ActionButtons from '@/components/pages/ErrorPage/ActionButtons';
import ErrorDetails from '@/components/pages/ErrorPage/ErrorDetails';
import CONST from '@/utils/constant';

function getDefaultMessage(status) {
  const messages = {
    404: CONST.DEFAULT_MSG.NOT_FOUND,
    403: CONST.DEFAULT_MSG.PERMISSION_ACCESS,
    401: CONST.DEFAULT_MSG.LOGINED_REQUIRED,
    500: CONST.HTTP_ERROR_MSG.INTERNAL_SERVER_ERROR,
  };
  return messages[status] || CONST.DEFAULT_MSG.PROGRESS_ERROR;
}

function parseError(error) {
  let title = 'Unexpected Error';
  let message = CONST.DEFAULT_MSG.WENT_WRONG;
  let statusCode = null;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    title = `${error.status} - ${error.statusText}`;
    message = error.data?.message || getDefaultMessage(error.status);
  } else if (error instanceof Error) {
    title = error.name || 'JavaScript Error';
    message = error.message || CONST.HTTP_ERROR_MSG.OTHER_ERROR;
  } else if (typeof error === 'string') {
    message = error;
  }

  return { title, message, statusCode };
}

export default function ErrorPage() {
  const error = useRouteError();
  const { title, message, statusCode } = parseError(error);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-dark-white text-black dark:text-dark-black font-sans'>
      <ErrorIcon statusCode={statusCode} />
      <ErrorHeader title={title} message={message} />
      <ActionButtons />
      <ErrorDetails error={error} />
    </div>
  );
}
