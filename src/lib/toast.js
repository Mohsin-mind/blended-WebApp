import { toast } from 'sonner';

export const showToast = (type, message, options = {}) => {
  switch (type) {
    case 'success':
      return toast.success(message, options);
    case 'error':
      return toast.error(message, options);
    case 'info':
      return toast.info(message, options);
    case 'warning':
      return toast.warning?.(message, options) || toast(message, options);
    case 'loading':
      return toast.loading(message, options);
    default:
      return toast(message, options);
  }
};
