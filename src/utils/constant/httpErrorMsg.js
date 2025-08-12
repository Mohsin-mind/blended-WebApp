const HTTP_ERROR_MSG = {
  BAD_REQUEST: 'Invalid request. Please check your input and try again.',
  UNAUTHORIZED: 'Session expired. Please log in again.',
  FORBIDDEN: 'Insufficient permissions',
  NOT_FOUND: 'The requested resource was not found',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
  INTERNAL_SERVER_ERROR: 'Internal server error. Please try again later.',
  DEFAULT_ERROR: 'An error occurred. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  OTHER_ERROR: 'An unexpected error occurred. Please try again.',
  UNOTHORIZED_ACCESS: 'Unauthorized access detected',
  SERVER_ERROR: 'Server error detected',
};

export default HTTP_ERROR_MSG;
