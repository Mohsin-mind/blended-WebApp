import PropTypes from 'prop-types';
import { SWRConfig } from 'swr';
import api from '../services/api';
import CONST from '@/utils/constant';

// Global SWR fetcher
const fetcher = url => api.get(url).then(res => res.data);

// Global SWR configuration
const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  errorRetryCount: 3,
  errorRetryInterval: 1000,
  dedupingInterval: 2000,
  refreshInterval: 0, // Disable automatic refresh by default
  onError: (error, key) => {
    // eslint-disable-next-line no-console
    console.error('SWR Error:', { key, error });
    if (error.response?.status === CONST.HTTP_STATUS.UNAUTHORIZED) {
      // Unauthorized - token might be expired
      // eslint-disable-next-line no-console
      console.warn(CONST.HTTP_ERROR_MSG.UNOTHORIZED_ACCESS);
    }
    if (error.response?.status >= CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      // Server error - could show a toast notification
      // eslint-disable-next-line no-console
      console.error(CONST.HTTP_ERROR_MSG.SERVER_ERROR);
    }
  },
  onSuccess: () => {
    // Optional: log successful requests in devemind
    // lopment
    if (import.meta.env.MODE === 'development') {
      // console.log('SWR Success:', { key, data });
    }
  },
  // Cache provider (optional - uses Map by default)
  provider: () => new Map(),
};

export const SWRProvider = ({ children }) => {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};

SWRProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
