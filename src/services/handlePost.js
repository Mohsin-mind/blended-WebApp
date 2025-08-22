import api from './api';

export async function handlePost(method, url, payload, config = {}) {
  const response = await api[method.toLowerCase()](url, payload, config);
  const { data, meta } = response.data;
  return { data, meta };
}
