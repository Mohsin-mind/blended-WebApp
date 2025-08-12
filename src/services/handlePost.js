import { showToast } from '@/lib/toast';

const PREVENT_TOAST = ['/login', '/logout'];

export async function handlePost(client, method, url, payload, config = {}) {
  const response = await client[method.toLowerCase()](url, payload, config);
  const { data, meta } = response.data;

  const isToastPrevented = PREVENT_TOAST.includes(url);

  if (!isToastPrevented) {
    showToast(meta.code ? 'success' : 'error', meta.message);
  } else if (!meta.code) {
    showToast('error', meta.message);
  }

  return { data, meta };
}
