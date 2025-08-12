import CONST from '@/utils/constant';

export function handleError(error) {
  if (error.response) {
    const { status, data } = error.response;
    return {
      message: data.message || CONST.HTTP_ERROR_MSG.DEFAULT_ERROR + '1',
      status,
      errors: data.errors || [],
    };
  } else if (error.request) {
    return {
      message: CONST.HTTP_ERROR_MSG.NETWORK_ERROR,
      status: 0,
      errors: [],
    };
  }
  return {
    message: error.message || CONST.HTTP_ERROR_MSG.DEFAULT_ERROR + '2',
    status: 0,
    errors: [],
  };
}
