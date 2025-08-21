import { showToast } from '@/lib/toast';

const PREVENT_TOAST = ['/login', '/logout'];

export async function handlePost(
  client,
  method,
  url,
  payload,
  config = {},
  showSuccessToast = true,
  showErrorToast = true
) {
  const response = await client[method.toLowerCase()](url, payload, config);
  const { data, meta } = response.data;

  const isToastPrevented = PREVENT_TOAST.includes(url);

  if (!isToastPrevented && showSuccessToast) {
    showToast(meta?.code ? 'success' : 'error', meta?.message);
  } else if (!meta?.code && showErrorToast) {
    showToast('error', meta.message);
  }

  return { data, meta };
}
